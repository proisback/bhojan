export default function WeekScreen({
  C,
  MT,
  MI,
  FDAYS,
  shareWA,
  regen,
  weekDates,
  plan,
  today,
  fmtD,
  getFest,
  setSwapT,
  MealCard,
}) {
  return (
    <div style={{ padding: "14px 14px 100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2 style={{ fontFamily: "'Outfit'", fontSize: 20, fontWeight: 800, color: C.brown, margin: 0 }}>Week Plan</h2>
        <div style={{ display: "flex", gap: 4 }}>
          <button onClick={shareWA} style={{ background: "#25D366", border: "none", borderRadius: 8, padding: "6px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", color: "white" }}>💬 Share</button>
          <button onClick={regen} style={{ background: C.orangeL, border: "none", borderRadius: 8, padding: "6px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", color: C.orange }}>🔄 New</button>
        </div>
      </div>
      {weekDates.map((date, idx) => {
        const ds = fmtD(date), dp = plan[ds], fest = getFest(ds), isT = ds === today;
        return (<div key={ds} style={{ background: isT ? C.orangeL : C.card, borderRadius: 14, padding: 10, border: isT ? `2px solid ${C.orange}` : `1.5px solid ${C.border}`, marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <div><span style={{ fontFamily: "'Outfit'", fontWeight: 700, color: C.brown, fontSize: 14 }}>{FDAYS[idx]}</span><span style={{ fontSize: 10, color: C.brownL, marginLeft: 4 }}>{date.getDate()}/{date.getMonth() + 1}</span>{isT && <span style={{ fontSize: 8, marginLeft: 4, background: C.orange, color: "white", padding: "1px 5px", borderRadius: 4, fontWeight: 700 }}>TODAY</span>}</div>
            {fest && <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 5, background: fest.type === "fast" ? "#FFF3E0" : "#E8F5E9", color: fest.type === "fast" ? "#E65100" : "#2E7D32", fontWeight: 700 }}>{fest.name}</span>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {MT.map(mt => dp?.[mt] && <div key={mt} style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <span style={{ fontSize: 12, width: 18 }}>{MI[mt]}</span>
              <div style={{ flex: 1 }}><MealCard meal={dp[mt]} ds={ds} mt={mt} compact /></div>
              <button onClick={() => setSwapT({ ds, mt })} style={{ background: "#F5EDE0", border: "none", borderRadius: 6, width: 24, height: 24, cursor: "pointer", fontSize: 10 }}>🔄</button>
            </div>)}
          </div>
        </div>);
      })}
    </div>
  );
}
