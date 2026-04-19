import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 25px",
      background: "#111827",
      color: "white"
    }}>
      <h2 style={{ margin: 0, fontWeight: 600 }}>🤖🌱🗺️ GreenRoute AI</h2>

      <div style={{ display: "flex", gap: "12px" }}>
        
        <button onClick={() => navigate("/dashboard")}>儀表板</button>
        <button onClick={() => navigate("/delivery")}>新增配送</button>
        <button onClick={() => navigate("/eco-match")}>環保配對</button>
        <button onClick={() => navigate("/history")}>配送紀錄</button>
        <button onClick={() => navigate("/map")}>地圖</button>

        <button
          onClick={handleLogout}
          style={{ background: "#ef4444", color: "white", borderRadius: "6px" }}
        >
          登出
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
