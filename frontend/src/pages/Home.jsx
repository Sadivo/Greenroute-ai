import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ color: "#1e1e2f" }}>
        <span role="img" aria-label="seedling">🌱</span> 歡迎使用 GreenRoute AI
      </h1>
      <p style={{ fontSize: "1.1rem", color: "#333" }}>
        我們為您優化配送路線，共創更環保的未來。
      </p>
    </div>
  );
}

