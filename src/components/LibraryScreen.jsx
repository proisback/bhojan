import { useState } from "react";

export default function LibraryScreen({
  C,
  DB,
  disliked,
  setDisliked,
  liked,
  setLiked,
  setDetail,
  FoodImg,
}) {
  const [search, setSearch] = useState("");
  const [ft, setFt] = useState("all");
  const filtered = DB.filter(m => {
    if (ft !== "all" && m.type !== ft) return false;
    if (search) { const s = search.toLowerCase(); return m.name.toLowerCase().includes(s) || m.tags.some(t => t.includes(s)) || m.region.toLowerCase().includes(s); }
    return true;
  });
  return (
    <div style={{ padding: "14px 14px 100px" }}>
      <h2 style={{ fontFamily: "'Outfit'", fontSize: 20, fontWeight: 800, color: C.brown, margin: "0 0 8px" }}>Meal Library</h2>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
        style={{ width: "100%", padding: "9px 12px", borderRadius: 10, border: `2px solid ${C.border}`, fontSize: 13, outline: "none", boxSizing: "border-box", background: C.card, marginBottom: 8 }} />
      <div style={{ display: "flex", gap: 4, marginBottom: 10, overflowX: "auto" }}>
        {[{ k: "all", l: "All" }, { k: "breakfast", l: "🌅 B" }, { k: "lunch", l: "☀️ L" }, { k: "dinner", l: "🌙 D" }].map(f => (
          <button key={f.k} onClick={() => setFt(f.k)} style={{ padding: "5px 10px", borderRadius: 7, border: ft === f.k ? `2px solid ${C.orange}` : `2px solid ${C.border}`, background: ft === f.k ? C.orangeL : C.card, fontSize: 11, fontWeight: 600, cursor: "pointer", color: ft === f.k ? C.orange : C.brownL }}>{f.l}</button>
        ))}
      </div>
      <p style={{ fontSize: 10, color: C.brownL, marginBottom: 8 }}>{filtered.length} meals · 100% Vegetarian</p>
      {filtered.slice(0, 30).map(meal => {
        const isD = disliked.includes(meal.id);
        return (<div key={meal.id} onClick={() => setDetail(meal)} style={{ display: "flex", alignItems: "center", background: C.card, borderRadius: 12, border: `1.5px solid ${C.border}`, overflow: "hidden", cursor: "pointer", marginBottom: 6, opacity: isD ? 0.4 : 1 }}>
          <FoodImg src={meal.img} name={meal.name} style={{ width: 50, height: 50, flexShrink: 0 }} />
          <div style={{ flex: 1, padding: "6px 8px", minWidth: 0 }}>
            <div style={{ fontWeight: 600, color: C.brown, fontSize: 12 }}>{meal.name}</div>
            <div style={{ fontSize: 10, color: C.brownL }}>{meal.macros.cal}kcal · {meal.macros.p}g P · {meal.effort}m · {meal.region}</div>
          </div>
          <div style={{ display: "flex", gap: 2, padding: 4 }}>
            <button onClick={e => { e.stopPropagation(); setLiked(p => p.includes(meal.id) ? p.filter(x => x !== meal.id) : [...p, meal.id]); }} style={{ width: 26, height: 26, borderRadius: 7, background: liked.includes(meal.id) ? "#E8F5E9" : "transparent", border: "none", cursor: "pointer", fontSize: 13 }}>👍</button>
            <button onClick={e => { e.stopPropagation(); setDisliked(p => p.includes(meal.id) ? p.filter(x => x !== meal.id) : [...p, meal.id]); }} style={{ width: 26, height: 26, borderRadius: 7, background: isD ? "#FFEBEE" : "transparent", border: "none", cursor: "pointer", fontSize: 13 }}>👎</button>
          </div>
        </div>);
      })}
    </div>
  );
}
