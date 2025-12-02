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
        
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/delivery")}>Delivery</button>
        <button onClick={() => navigate("/eco-match")}>Eco Match</button>
        <button onClick={() => navigate("/history")}>History</button>
        <button onClick={() => navigate("/map")}>Map</button>

        <button 
          onClick={handleLogout} 
          style={{ background: "#ef4444", color: "white", borderRadius: "6px" }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
