import { useEffect, useState } from "react";

function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetch("/dashboard-summary")
      .then((res) => res.json())
      .then((data) => setSummary(data));
  }, []);

  if (!summary) {
    return <h2 style={{ textAlign: "center", marginTop: "20vh", color: "white" }}>載入中...</h2>;
  }

  return (
    <div style={styles.wrapper}>

      {/* Animated floating shapes */}
      <div style={styles.shape1}></div>
      <div style={styles.shape2}></div>

      <h1 style={styles.title}>📊 GreenRoute AI 儀表板</h1>
      <p style={styles.subtitle}>智慧環保物流監控中心</p>

      <div style={styles.grid}>
        {/* 總配送次數 */}
        <div style={styles.card}>
          <h2 style={styles.cardNumber}>{summary.total_deliveries}</h2>
          <p style={styles.cardLabel}>總配送次數</p>
        </div>

        {/* 環保配送次數 */}
        <div style={styles.card}>
          <h2 style={styles.cardNumber}>{summary.eco_deliveries}</h2>
          <p style={styles.cardLabel}>環保配送次數</p>
        </div>

        {/* 節省燃油 */}
        <div style={styles.card}>
          <h2 style={styles.cardNumber}>{summary.fuel_saved_liters} 公升</h2>
          <p style={styles.cardLabel}>節省燃油量</p>
        </div>

        {/* 減少碳排 */}
        <div style={styles.card}>
          <h2 style={styles.cardNumber}>{summary.co2_reduced_kg} 公斤</h2>
          <p style={styles.cardLabel}>減少 CO₂ 排放</p>
        </div>

        {/* 環保點數 */}
        <div style={styles.cardLarge}>
          <h2 style={styles.cardNumber}>{summary.eco_points}</h2>
          <p style={styles.cardLabel}>累積環保點數</p>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;

/* ---------- ULTRA PREMIUM DASHBOARD STYLES ---------- */

const styles = {
  wrapper: {
    minHeight: "100vh",
    padding: "30px",
    background: "linear-gradient(135deg, #0f766e, #0ddba4ff, #0f766e)",
    color: "white",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Inter, sans-serif",
  },

  /* Floating blobs */
  shape1: {
    position: "absolute",
    width: "380px",
    height: "380px",
    top: "-80px",
    left: "-100px",
    background: "rgba(255,255,255,0.15)",
    borderRadius: "50%",
    filter: "blur(70px)",
    animation: "float 7s ease-in-out infinite",
  },

  shape2: {
    position: "absolute",
    width: "420px",
    height: "420px",
    bottom: "-100px",
    right: "-120px",
    background: "rgba(255,255,255,0.12)",
    borderRadius: "50%",
    filter: "blur(70px)",
    animation: "float 6s ease-in-out infinite",
  },

  title: {
    fontSize: "42px",
    fontWeight: "800",
    textAlign: "center",
    marginBottom: "5px",
    zIndex: 2,
    position: "relative",
  },

  subtitle: {
    fontSize: "16px",
    opacity: 0.8,
    textAlign: "center",
    marginBottom: "40px",
    position: "relative",
    zIndex: 2,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "25px",
    padding: "0 20px",
    position: "relative",
    zIndex: 5,
  },

  card: {
    background: "rgba(255,255,255,0.20)",
    backdropFilter: "blur(14px)",
    padding: "30px",
    borderRadius: "18px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    transition: "0.4s",
    cursor: "pointer",
    animation: "fadeIn 0.8s ease",
  },

  cardLarge: {
    background: "rgba(255,255,255,0.25)",
    backdropFilter: "blur(16px)",
    padding: "40px",
    borderRadius: "18px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    gridColumn: "span 2",
    transition: "0.4s",
    cursor: "pointer",
    animation: "fadeIn 1s ease",
  },

  cardNumber: {
    fontSize: "40px",
    fontWeight: "700",
    marginBottom: "10px",
  },

  cardLabel: {
    fontSize: "16px",
    opacity: 0.9,
    letterSpacing: "0.3px",
  }
};

/* ---------- GLOBAL ANIMATIONS ---------- */

const globalStyles = `
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-18px); }
  100% { transform: translateY(0px); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

if (!document.getElementById("dashboard-animations")) {
  const styleTag = document.createElement("style");
  styleTag.id = "dashboard-animations";
  styleTag.innerHTML = globalStyles;
  document.head.appendChild(styleTag);
}
