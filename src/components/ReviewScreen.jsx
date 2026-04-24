export default function ReviewScreen({
  C,
  MI,
  DAYS,
  weekDates,
  fmtD,
  plan,
  ratings,
  setRatings,
  FoodImg,
}) {
  const all = []; Object.entries(plan).forEach(([ds, dp]) => Object.entries(dp).forEach(([mt, m]) => { if (m) all.push({ ...m, ds, mt }); }));
  const rated = Object.keys(ratings).length;
  return (
    <div style={{ padding: "14px 14px 100px" }}>
      <h2 style={{ fontFamily: "'Outfit'", fontSize: 20, fontWeight: 800, color: C.brown, margin: "0 0 10px" }}>Weekly Review</h2>
      <div style={{ width: "100%", height: 4, borderRadius: 2, background: C.border, marginBottom: 14, overflow: "hidden" }}><div style={{ width: `${all.length ? (rated / all.length) * 100 : 0}%`, height: "100%", background: C.green, borderRadius: 2 }} /></div>
      {all.map((m, i) => {
        const rk = `${m.ds}-${m.mt}-${m.id}`, r = ratings[rk];
        return (<div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: C.card, borderRadius: 10, border: `1.5px solid ${C.border}`, overflow: "hidden", marginBottom: 5 }}>
          <FoodImg src={m.img} name={m.name} style={{ width: 40, height: 40, flexShrink: 0 }} />
          <div style={{ flex: 1, padding: "4px 0", minWidth: 0 }}>
            <div style={{ fontSize: 9, color: C.brownL, fontWeight: 600 }}>{MI[m.mt]} {DAYS[weekDates.findIndex(d => fmtD(d) === m.ds)]}</div>
            <div style={{ fontWeight: 600, color: C.brown, fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.name}{m.tags.includes("spicy") ? " 🌶️🌶️🌶️" : m.tags.includes("medium") ? " 🌶️🌶️" : m.tags.includes("mild") ? " 🌶️" : ""}</div>
          </div>
          <div style={{ display: "flex", gap: 2, paddingRight: 6 }}>
            {[{ e: "✅", v: "cooked", bg: "#E8F5E9", bc: "#4CAF50" }, { e: "⏭️", v: "skipped", bg: "#FFEBEE", bc: "#EF5350" }, { e: "🔁", v: "repeat", bg: "#FFF3E0", bc: "#FF9800" }].map(o => (
              <button key={o.v} onClick={() => setRatings(p => ({ ...p, [rk]: o.v }))} style={{ background: r === o.v ? o.bg : "#F5F0E8", border: r === o.v ? `2px solid ${o.bc}` : "2px solid transparent", borderRadius: 7, padding: "4px 7px", cursor: "pointer", fontSize: 13 }}>{o.e}</button>
            ))}
          </div>
        </div>);
      })}
    </div>
  );
}
