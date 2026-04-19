import { useEffect, useState } from "react";
import axios from "axios";
import "./History.css"; // Optional styling

export default function History() {
  const [deliveries, setDeliveries] = useState([]);

  // Load deliveries on page load
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    axios
      .get("/deliveries")
      .then((res) => {
        setDeliveries(res.data);
      })
      .catch((err) => {
        console.error("載入配送紀錄失敗：", err);
      });
  };

  // DELETE function for a delivery
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "確定要刪除這筆配送紀錄嗎？"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/delete-delivery/${id}`);

      // Remove from frontend instantly
      setDeliveries(deliveries.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("刪除失敗，請稍後再試。");
    }
  };

  return (
    <div className="history-container">
      <h2>📜 配送紀錄</h2>

      {deliveries.length === 0 ? (
        <p>尚無配送紀錄。</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>編號</th>
              <th>取貨地點</th>
              <th>送達地點</th>
              <th>日期</th>
              <th>時間</th>
              <th>包裹大小</th>
              <th>環保？</th>
              <th>操作</th>
            </tr>
          </thead>

          <tbody>
            {deliveries.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.pickup}</td>
                <td>{d.dropoff}</td>
                <td>{d.date}</td>
                <td>{d.time}</td>
                <td>{d.packageType}</td>
                <td>{d.ecoFriendly ? "✅" : "❌"}</td>

                {/* DELETE BUTTON */}
                <td>
                  <button
                    onClick={() => handleDelete(d.id)}
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
