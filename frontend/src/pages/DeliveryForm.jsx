import { useState } from "react";
import axios from "axios";

export default function DeliveryForm() {
  const [formData, setFormData] = useState({
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    packageType: "medium",
    ecoFriendly: true,
  });

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/submit-delivery", formData);
      console.log("✅ Server Response:", res.data);
      setResponse(res.data);
    } catch (err) {
      console.error("❌ Error submitting:", err);
      alert("提交失敗，請確認後端伺服器是否正常運作。");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📦 新增配送路線</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <label>
          取貨地點：
          <input type="text" name="pickup" value={formData.pickup} onChange={handleChange} required />
        </label>
        <br /><br />

        <label>
          送達地點：
          <input type="text" name="dropoff" value={formData.dropoff} onChange={handleChange} required />
        </label>
        <br /><br />

        <label>
          日期：
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </label>
        <br /><br />

        <label>
          時間：
          <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        </label>
        <br /><br />

        <label>
          包裹大小：
          <select name="packageType" value={formData.packageType} onChange={handleChange}>
            <option value="small">小型</option>
            <option value="medium">中型</option>
            <option value="large">大型</option>
          </select>
        </label>
        <br /><br />

        <label>
          環保配送：
          <input type="checkbox" name="ecoFriendly" checked={formData.ecoFriendly} onChange={handleChange} />
        </label>
        <br /><br />

        <button type="submit">送出配送</button>
      </form>

      {response && (
        <div style={{ marginTop: "2rem", background: "#e6f5e6", padding: "1rem", borderRadius: "10px" }}>
          <h3>✅ 配送已提交！</h3>
          <p><strong>狀態：</strong> {response.status}</p>
          <p><strong>訊息：</strong> {response.message}</p>
          {response.ecoMatch && (
            <>
              <p>🌍 <strong>節省 CO₂：</strong> {response.estimated_co2_saved} 公斤</p>
              <p>🧠 <strong>合併配送：</strong> {response.delivery_group}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
