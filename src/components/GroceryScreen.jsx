export default function GroceryScreen({
  grocery,
  grocCheck,
  setGrocCheck,
  servings,
  setServings,
  setGrocery,
  plan,
  shareGrocWA,
  genGrocery,
  C,
}) {
  if (!grocery) return null;
  const total = Object.values(grocery).flat().length;
  const checked = Object.values(grocCheck).filter(Boolean).length;
  return (
    <div style={{ padding: "14px 14px 100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <h2 style={{ fontFamily: "'Outfit'", fontSize: 20, fontWeight: 800, color: C.brown, margin: 0 }}>Grocery</h2>
        <button onClick={shareGrocWA} style={{ background: "#25D366", border: "none", borderRadius: 8, padding: "6px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", color: "white" }}>💬 Share (unchecked only)</button>
      </div>
      <p style={{ fontSize: 11, color: C.brownL, margin: "2px 0 10px" }}>{servings} servings · {checked}/{total} have at home</p>
      <div style={{ display: "flex", gap: 6, marginBottom: 12, alignItems: "center" }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: C.brownM }}>Servings:</span>
        <select value={servings} onChange={e => { setServings(+e.target.value); setGrocery(genGrocery(plan, +e.target.value)); }}
          style={{ padding: "4px 8px", borderRadius: 6, border: `1.5px solid ${C.border}`, fontSize: 12, fontWeight: 600, color: C.orange, background: C.card }}>
          {[2, 3, 4, 5, 6, 7, 8, 10].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div style={{ width: "100%", height: 4, borderRadius: 2, background: C.border, marginBottom: 14, overflow: "hidden" }}>
        <div style={{ width: `${total ? (checked / total) * 100 : 0}%`, height: "100%", background: C.green, borderRadius: 2, transition: "0.3s" }} />
      </div>
      {Object.entries(grocery).map(([cat, items]) => {
        if (!items.length) return null;
        return (<div key={cat} style={{ marginBottom: 12 }}>
          <h3 style={{ fontFamily: "'Outfit'", fontSize: 13, fontWeight: 700, color: C.brownM, margin: "0 0 4px", padding: "4px 0", borderBottom: `1px solid ${C.border}` }}>{cat}</h3>
          {items.map(item => (
            <label key={item.name} onClick={() => setGrocCheck(p => ({ ...p, [item.name]: !p[item.name] }))}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 8px", borderRadius: 6, cursor: "pointer", background: grocCheck[item.name] ? "#F5F5F0" : "transparent" }}>
              <div style={{ width: 18, height: 18, borderRadius: 5, border: grocCheck[item.name] ? "none" : `2px solid #D4C5B0`, background: grocCheck[item.name] ? "#4CAF50" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {grocCheck[item.name] && <span style={{ color: "white", fontSize: 11 }}>✓</span>}
              </div>
              <span style={{ flex: 1, fontSize: 13, color: grocCheck[item.name] ? "#aaa" : C.brown, textDecoration: grocCheck[item.name] ? "line-through" : "none" }}>{item.name}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: grocCheck[item.name] ? "#ccc" : C.orange }}>{item.val} {item.unit}</span>
            </label>
          ))}
        </div>);
      })}
    </div>
  );
}
