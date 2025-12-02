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
      .get("http://localhost:8000/deliveries")
      .then((res) => {
        setDeliveries(res.data);
      })
      .catch((err) => {
        console.error("Failed to load delivery history:", err);
      });
  };

  // DELETE function for a delivery
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this delivery?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/delete-delivery/${id}`);

      // Remove from frontend instantly
      setDeliveries(deliveries.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete delivery.");
    }
  };

  return (
    <div className="history-container">
      <h2>📜 Delivery History</h2>

      {deliveries.length === 0 ? (
        <p>No deliveries yet.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Pickup</th>
              <th>Dropoff</th>
              <th>Date</th>
              <th>Time</th>
              <th>Package</th>
              <th>Eco?</th>
              <th>Action</th> {/* NEW COLUMN */}
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
                    Delete
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
