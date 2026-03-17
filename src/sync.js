import { supabase } from "./supabase";

// ═══════════════════════════════════════════════════════════
// SYNC LAYER — Supabase + localStorage offline fallback
// Writes go to both. Reads prefer Supabase, fall back to local.
// ═══════════════════════════════════════════════════════════

// ── Helpers ──
function weekStartFromPlan(plan) {
  if (!plan) return null;
  const keys = Object.keys(plan).sort();
  return keys[0] || null;
}

// ── LOAD: Pull full state from Supabase ──
export async function loadFromSupabase(userId) {
  if (!supabase) return null;
  try {
    // Get household
    const { data: household, error: hErr } = await supabase
      .from("households")
      .select("*")
      .eq("owner_id", userId)
      .maybeSingle();
    if (hErr) throw hErr;
    if (!household) return null; // new user, no data yet

    // Parallel fetches
    const [membersRes, prefsRes, planRes] = await Promise.all([
      supabase.from("family_members").select("*").eq("household_id", household.id).order("sort_order"),
      supabase.from("preferences").select("*").eq("household_id", household.id).maybeSingle(),
      supabase.from("weekly_plans").select("*").eq("household_id", household.id).order("week_start", { ascending: false }).limit(1).maybeSingle(),
    ]);

    const members = (membersRes.data || []).map((m, i) => ({
      id: m.id, name: m.name, role: m.role,
    }));

    const prefs = prefsRes.data ? {
      regions: prefsRes.data.regions || [],
      spice: prefsRes.data.spice || "medium",
      maxEffort: prefsRes.data.max_effort || 45,
    } : null;

    const liked = prefsRes.data?.liked_meals || [];
    const disliked = prefsRes.data?.disliked_meals || [];

    let plan = null, locked = {}, weekStart = null;
    if (planRes.data) {
      plan = planRes.data.plan_data;
      locked = planRes.data.locked_data || {};
      weekStart = planRes.data.week_start;
    }

    // Load grocery checks and ratings for this week
    let grocCheck = {}, ratings = {};
    if (weekStart) {
      const [grocRes, ratingsRes] = await Promise.all([
        supabase.from("grocery_checks").select("*").eq("household_id", household.id).eq("week_start", weekStart),
        supabase.from("meal_ratings").select("*").eq("household_id", household.id).eq("week_start", weekStart),
      ]);
      (grocRes.data || []).forEach(g => { if (g.checked) grocCheck[g.item_name] = true; });
      (ratingsRes.data || []).forEach(r => { ratings[r.meal_key] = r.rating; });
    }

    return {
      householdId: household.id,
      step: "main",
      familyName: household.name,
      members: members.length ? members : null,
      servings: household.servings,
      hasBaby: household.has_baby,
      prefs, liked, disliked,
      plan, locked, grocCheck, ratings,
    };
  } catch (err) {
    console.error("Supabase load failed, falling back to localStorage:", err);
    return null;
  }
}

// ── SAVE: Push full state to Supabase ──
export async function saveToSupabase(userId, householdId, state) {
  if (!supabase) return householdId;
  try {
    // Upsert household
    let hId = householdId;
    if (!hId) {
      const { data, error } = await supabase.from("households").insert({
        owner_id: userId,
        name: state.familyName || "",
        servings: state.servings,
        has_baby: state.hasBaby,
      }).select("id").single();
      if (error) throw error;
      hId = data.id;
    } else {
      await supabase.from("households").update({
        name: state.familyName || "",
        servings: state.servings,
        has_baby: state.hasBaby,
      }).eq("id", hId);
    }

    // Upsert members — delete and re-insert for simplicity
    await supabase.from("family_members").delete().eq("household_id", hId);
    if (state.members?.length) {
      await supabase.from("family_members").insert(
        state.members.map((m, i) => ({
          household_id: hId,
          name: m.name || "",
          role: m.role || "",
          sort_order: i,
        }))
      );
    }

    // Upsert preferences
    await supabase.from("preferences").upsert({
      household_id: hId,
      regions: state.prefs?.regions || [],
      spice: state.prefs?.spice || "medium",
      max_effort: state.prefs?.maxEffort || 45,
      liked_meals: state.liked || [],
      disliked_meals: state.disliked || [],
    }, { onConflict: "household_id" });

    // Upsert weekly plan
    if (state.plan) {
      const weekStart = weekStartFromPlan(state.plan);
      if (weekStart) {
        await supabase.from("weekly_plans").upsert({
          household_id: hId,
          week_start: weekStart,
          plan_data: state.plan,
          locked_data: state.locked || {},
        }, { onConflict: "household_id,week_start" });

        // Sync grocery checks
        const grocEntries = Object.entries(state.grocCheck || {});
        if (grocEntries.length) {
          await supabase.from("grocery_checks").upsert(
            grocEntries.map(([item_name, checked]) => ({
              household_id: hId,
              week_start: weekStart,
              item_name,
              checked: !!checked,
            })),
            { onConflict: "household_id,week_start,item_name" }
          );
        }

        // Sync meal ratings
        const ratingEntries = Object.entries(state.ratings || {});
        if (ratingEntries.length) {
          await supabase.from("meal_ratings").upsert(
            ratingEntries.map(([meal_key, rating]) => ({
              household_id: hId,
              week_start: weekStart,
              meal_key,
              meal_id: meal_key.split("-").pop() || meal_key,
              rating,
            })),
            { onConflict: "household_id,week_start,meal_key" }
          );
        }
      }
    }

    return hId;
  } catch (err) {
    console.error("Supabase save failed (localStorage still has your data):", err);
    return householdId;
  }
}
