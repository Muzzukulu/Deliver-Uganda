import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Order = {
  parcel_tracker_number: string;
  status: string;
  pickup_address: string;
  dropoff_address: string;
  current_lat?: any;
  current_lng?: any;
};

export default function Track() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    // Fix leaflet icon
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    const map = L.map("map").setView([0.3476, 32.5825], 13);
    mapRef.current = map;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    markerRef.current = L.marker([0.3476, 32.5825]).addTo(map).bindPopup("Boda 🏍️");

    const fetchTrack = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/orders/track/${id}`);
        console.log("TRACK DATA:", res.data);
        setOrder(res.data);
        if (res.data.current_lat && res.data.current_lng) {
          const lat = Number(res.data.current_lat);
          const lng = Number(res.data.current_lng);
          markerRef.current?.setLatLng([lat, lng]);
          map.setView([lat, lng], 15);
        }
      } catch (e:any) {
        console.error(e);
        setError(e.response?.data?.message || e.message);
      }
    };

    fetchTrack();
    const iv = setInterval(fetchTrack, 5000);
    return () => {
      clearInterval(iv);
      map.remove();
    };
  }, [id]);

  return (
    <div style={{ padding: 20, minHeight: '100vh', background: 'white', color:'black' }}>
      <h1 style={{fontSize:24, fontWeight:'bold'}}>📍 Tracking {id}</h1>
      {error && <div style={{background:'red', color:'white', padding:10}}>Error: {error} — Check backend /api/orders/track/{id}</div>}
      {!order &&!error && <p>📦 Loading... check F12 console</p>}
      {order && (
        <>
          <p><b>Status:</b> {order.status} {order.status === "in_transit" && "🟢 LIVE"}</p>
          <p><b>{order.pickup_address}</b> → <b>{order.dropoff_address}</b></p>
          <p>GPS: {order.current_lat?.toString() || "Waiting for rider"}, {order.current_lng?.toString() || ""}</p>
        </>
      )}
      <div id="map" style={{ height: "500px", width:'100%', borderRadius: 16, marginTop: 20, background:'#eee' }}></div>
    </div>
  );
}