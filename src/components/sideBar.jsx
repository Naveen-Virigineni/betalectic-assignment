function Sidebar({ data }) {
  const max = Math.max(...Object.values(data), 1);
  const CHART_HEIGHT = 120; // px

  const COLORS = {
    Work: "#a78bfa",
    Personal: "#34d399",
    Study: "#60a5fa",
    Urgent: "#f87171",
  };

  return (
    <div style={{
      width: "280px",
      background: "#ffffff",
      padding: "20px",
      borderRadius: "16px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      color: "#111",
    }}>
      <h3 style={{ fontWeight: 600, marginBottom: "12px" }}>Category Tags</h3>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
        {Object.keys(data).map((cat) => (
          <span key={cat} style={{
            background: "#e5e7eb",
            padding: "4px 12px",
            borderRadius: "999px",
            fontSize: "13px",
            color: "#374151",
          }}>
            {cat}
          </span>
        ))}
      </div>

      <h3 style={{ fontWeight: 600, marginBottom: "12px" }}>Analytics Chart</h3>

      {/* Chart container */}
      <div style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "12px",
        height: `${CHART_HEIGHT}px`,
        borderBottom: "2px solid #e5e7eb",
      }}>
        {Object.entries(data).map(([cat, value]) => {
          // Calculate bar height in px directly
          const barHeight = value > 0
            ? Math.max((value / max) * CHART_HEIGHT, 16)
            : 4;

          return (
            <div key={cat} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, marginBottom: "4px", color: "#374151" }}>
                {value}
              </span>
              <div style={{
                width: "100%",
                height: `${barHeight}px`,
                background: value > 0 ? (COLORS[cat] || "#a78bfa") : "#e5e7eb",
                borderRadius: "4px 4px 0 0",
                transition: "height 0.4s ease",
              }} />
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
        {Object.keys(data).map((cat) => (
          <p key={cat} style={{ flex: 1, textAlign: "center", fontSize: "11px", color: "#6b7280", margin: 0 }}>
            {cat}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;