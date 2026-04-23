export default function TodayScreen({
  C,
  MT,
  familyName,
  syncStatus,
  user,
  supabase,
  signOut,
  signInWithGoogle,
  eatCount,
  members,
  eatingToday,
  setEatingToday,
  setServings,
  setGrocery,
  genGrocery,
  plan,
  todayFest,
  todayPlan,
  todayDs,
  hasBaby,
  weekMacros,
  regen,
  MealCard,
}) {
  return (
    <div style={{ padding: "14px 14px 100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontFamily: "'Outfit'", fontSize: 24, fontWeight: 900, color: C.brown, margin: "0 0 2px" }}>{familyName ? `${familyName}'s Kitchen` : "Today"} 🍲</h1>
          <p style={{ color: C.brownL, fontSize: 12, margin: "0 0 12px" }}>{new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, paddingTop: 4 }}>
          {syncStatus && <span style={{ fontSize: 9, color: syncStatus === "saved" ? C.green : syncStatus === "offline" ? C.red : C.brownL, fontWeight: 600 }}>{syncStatus === "saving" ? "Syncing..." : syncStatus === "saved" ? "Synced" : "Offline"}</span>}
          {user ? (
            <button onClick={signOut} style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "4px 8px", fontSize: 10, color: C.brownL, cursor: "pointer", fontWeight: 600 }}>Sign out</button>
          ) : supabase ? (
            <button onClick={signInWithGoogle} style={{ background: C.orangeL, border: `1.5px solid ${C.orange}`, borderRadius: 8, padding: "4px 8px", fontSize: 10, color: C.orange, cursor: "pointer", fontWeight: 600 }}>Sign in</button>
          ) : null}
        </div>
      </div>
      <div style={{ background: C.card, borderRadius: 14, padding: 10, border: `1.5px solid ${C.border}`, marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.brownM }}>👥 Eating today: {eatCount}</span>
          <button onClick={() => { setServings(eatCount); setGrocery(genGrocery(plan, eatCount)); }} style={{ fontSize: 10, color: C.orange, fontWeight: 600, background: C.orangeL, border: "none", borderRadius: 6, padding: "3px 8px", cursor: "pointer" }}>Update portions</button>
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {members.map((m, i) => <button key={m.id} onClick={() => setEatingToday(p => ({ ...p, [m.id]: !p[m.id] }))}
            style={{ padding: "4px 8px", borderRadius: 8, border: eatingToday[m.id] ? `1.5px solid ${C.green}` : `1.5px solid ${C.border}`, background: eatingToday[m.id] ? "#E8F5E9" : C.card, fontSize: 11, fontWeight: 600, cursor: "pointer", color: eatingToday[m.id] ? C.green : C.brownL }}>
            {["👩", "👨", "👴", "👵", "👦", "👧", "👶", "🧑"][i % 8]} {m.name || `P${i + 1}`}
          </button>)}
        </div>
      </div>
      {todayFest && <div style={{ background: todayFest.type === "fast" ? "#FFF3E0" : "#E8F5E9", borderRadius: 12, padding: "8px 12px", marginBottom: 12, border: todayFest.type === "fast" ? "1.5px solid #FFB74D" : "1.5px solid #81C784", fontSize: 12, fontWeight: 600, color: C.brown }}>
        {todayFest.type === "fast" ? "🪔" : "🎉"} {todayFest.name}
      </div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {MT.map(mt => <MealCard key={mt} meal={todayPlan?.[mt]} ds={todayDs} mt={mt} />)}
      </div>
      {hasBaby && <div style={{ marginTop: 12, background: "linear-gradient(135deg,#F3E5F5,#E1BEE7)", borderRadius: 14, padding: 12, border: "1.5px solid #CE93D8", fontSize: 12, color: "#6A1B9A", lineHeight: 1.5 }}>
        <b>👶 Baby Meals:</b> 🌅 Ragi porridge + banana · ☀️ Khichdi mash · 🌙 Curd rice + steamed veggies
      </div>}
      <div style={{ marginTop: 12, background: C.card, borderRadius: 14, padding: 12, border: `1.5px solid ${C.border}` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.brownM, marginBottom: 6 }}>📊 Today's Nutrition</div>
        <div style={{ display: "flex", gap: 4 }}>
          {[{ l: "Cal", v: weekMacros.days[todayDs]?.cal || 0, c: "#FF6F00" }, { l: "Protein", v: weekMacros.days[todayDs]?.p || 0, c: "#2E7D32", u: "g" }, { l: "Carbs", v: weekMacros.days[todayDs]?.c || 0, c: "#1565C0", u: "g" }, { l: "Fiber", v: weekMacros.days[todayDs]?.fb || 0, c: "#6A1B9A", u: "g" }].map(x => (
            <div key={x.l} style={{ flex: 1, textAlign: "center", background: "#F8F4EE", borderRadius: 8, padding: "6px 2px" }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: x.c, fontFamily: "'Outfit'" }}>{x.v}{x.u || ""}</div>
              <div style={{ fontSize: 9, color: C.brownL }}>{x.l}</div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={regen} style={{ marginTop: 14, width: "100%", background: `linear-gradient(135deg,${C.orange},#E8913A)`, color: "white", border: "none", borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit'" }}>🔄 Regenerate Week</button>
    </div>
  );
}
