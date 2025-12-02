import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

export default function MapView() {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/deliveries").then(async (res) => {
      const updated = await fetchCoordinates(res.data);
      setPositions(updated);
    });
  }, []);

  // 🌍 Geocode cities (with fallback)
  const geocodeCity = async (city, fallbackIndex) => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${city}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
    } catch (err) {
      console.log("Geocoding failed:", city, err);
    }

    // ⚠ Fallback coordinates if geocoder can't find the city
    return [
      19.0 + fallbackIndex * 0.03, // Slight spacing so they don't overlap
      73.0 + fallbackIndex * 0.03,
    ];
  };

  // Convert all deliveries into coordinates
  const fetchCoordinates = async (data) => {
    return Promise.all(
      data.map(async (d, index) => {
        const pickupPos = await geocodeCity(d.pickup, index);
        const dropoffPos = await geocodeCity(d.dropoff, index + 50);

        return {
          id: d.id,
          pickup: d.pickup,
          dropoff: d.dropoff,
          pickupPos,
          dropoffPos,
        };
      })
    );
  };

  return (
    <div style={{ height: "90vh", padding: "1rem" }}>
      <h2 style={{ marginBottom: "10px" }}>🗺️ Delivery Route Map</h2>

      <MapContainer
        center={[19.5, 75.0]} // Center of Maharashtra
        zoom={6}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {positions.map((d) => (
          <div key={d.id}>
            {/* Pickup Marker */}
            <Marker position={d.pickupPos}>
              <Popup>📦 Pickup: {d.pickup}</Popup>
            </Marker>

            {/* Dropoff Marker */}
            <Marker position={d.dropoffPos}>
              <Popup>📍 Dropoff: {d.dropoff}</Popup>
            </Marker>

            {/* Route Line */}
            <Polyline positions={[d.pickupPos, d.dropoffPos]} color="green" />
          </div>
        ))}
      </MapContainer>
    </div>
  );
}
