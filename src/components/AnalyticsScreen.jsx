export default function AnalyticsScreen({
  C,
  DAYS,
  weekDates,
  weekMacros,
  fmtD,
}) {
  const avg = k => Math.round(weekMacros[k] / 7);
  return (
    <div style={{ padding: "14px 14px 100px" }}>
      <h2 style={{ fontFamily: "'Outfit'", fontSize: 20, fontWeight: 800, color: C.brown, margin: "0 0 12px" }}>Health Analytics</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginBottom: 16 }}>
        {[{ l: "Avg Calories", v: avg("cal"), u: "kcal/day", c: "#FF6F00", em: "🔥" }, { l: "Avg Protein", v: `${avg("p")}g`, u: "/day", c: "#2E7D32", em: "💪" }, { l: "Avg Carbs", v: `${avg("c")}g`, u: "/day", c: "#1565C0", em: "🌾" }, { l: "Avg Fiber", v: `${avg("fb")}g`, u: "/day", c: "#6A1B9A", em: "🥦" }].map(c => (
          <div key={c.l} style={{ background: C.card, borderRadius: 14, padding: 14, border: `1.5px solid ${C.border}`, textAlign: "center" }}>
            <div style={{ fontSize: 22, marginBottom: 2 }}>{c.em}</div>
            <div style={{ fontFamily: "'Outfit'", fontSize: 22, fontWeight: 800, color: c.c }}>{c.v}</div>
            <div style={{ fontSize: 10, color: C.brownL }}>{c.l}</div>
          </div>
        ))}
      </div>
      <h3 style={{ fontFamily: "'Outfit'", fontSize: 14, fontWeight: 700, color: C.brown, margin: "0 0 8px" }}>Daily Breakdown</h3>
      {weekDates.map((d, i) => {
        const ds = fmtD(d), dm = weekMacros.days[ds] || {};
        return (<div key={ds} style={{ background: C.card, borderRadius: 10, padding: "8px 10px", border: `1.5px solid ${C.border}`, marginBottom: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontFamily: "'Outfit'", fontWeight: 600, fontSize: 12, color: C.brown }}>{DAYS[i]}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#FF6F00" }}>{dm.cal || 0} kcal</span>
          </div>
          <div style={{ display: "flex", gap: 3, height: 6 }}>
            {[{ v: dm.p || 0, max: 60, c: "#4CAF50" }, { v: dm.c || 0, max: 200, c: "#42A5F5" }, { v: dm.f || 0, max: 60, c: "#FF7043" }, { v: dm.fb || 0, max: 25, c: "#AB47BC" }].map((b, j) => (
              <div key={j} style={{ flex: 1, background: "#F0E6D6", borderRadius: 3, overflow: "hidden" }}><div style={{ width: `${Math.min(100, (b.v / b.max) * 100)}%`, height: "100%", background: b.c, borderRadius: 3 }} /></div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
            {[{ l: "P", v: dm.p, c: "#4CAF50" }, { l: "C", v: dm.c, c: "#42A5F5" }, { l: "F", v: dm.f, c: "#FF7043" }, { l: "Fb", v: dm.fb, c: "#AB47BC" }].map(x => <span key={x.l} style={{ fontSize: 9, color: x.c, fontWeight: 600 }}>{x.l}:{x.v || 0}g</span>)}
          </div>
        </div>);
      })}
    </div>
  );
}
