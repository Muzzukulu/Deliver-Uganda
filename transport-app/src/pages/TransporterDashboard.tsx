import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function TransporterDashboard() {
  const { trackerId } = useParams();
  const [isOnline, setIsOnline] = useState(true);
  const [myTransporter] = useState({ lat: 0.3476, lng: 32.5825, name: 'Muzzukulu' });
  const [orders, setOrders] = useState<any[]>([
    { id: 'DU-1665-8Q', client: 'Sarah', lat: 0.3476, lng: 32.5825, address: 'Kampala → Entebbe', amount: '15,000 UGX' }
  ]);
  const [activeTracker, setActiveTracker] = useState<string | null>(trackerId || null);
  const [isLive, setIsLive] = useState(!!trackerId);
  const watchId = useRef<number | null>(null);

  const handleAccept = async (orderId: string) => {
    setActiveTracker(orderId);
    setIsLive(true);
    if (navigator.geolocation) {
      watchId.current = navigator.geolocation.watchPosition(
        async (pos) => {
          try { await axios.post(`http://127.0.0.1:8000/api/orders/${orderId}/location`, { lat: pos.coords.latitude, lng: pos.coords.longitude }); } catch {}
        },
        undefined,
        { enableHighAccuracy: true }
      ) as any;
    }
  };

  const stopTrip = async () => {
    if (watchId.current!== null) navigator.geolocation.clearWatch(watchId.current);
    setIsLive(false);
    setActiveTracker(null);
    alert("✅ Delivery Completed!");
  };

  return (
    <div style={{padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto', background: '#fafaf9', minHeight: '100vh'}}>
      <div style={{textAlign: 'center', marginBottom: '24px', lineHeight: '1.1'}}>
        <div style={{fontSize: '52px'}}>🛵</div>
        <h1 style={{margin: 0, lineHeight: '0.95', fontSize: '32px', fontWeight: '900', color: '#5B21B6'}}>Deliver Uganda</h1>
        <p style={{margin: '6px 0 0 0', fontWeight: '800', color: '#7C3AED', letterSpacing: '5px', fontSize: '13px', background: '#EDE9FE', display: 'inline-block', padding: '4px 12px', borderRadius: '20px'}}>TRANSPORTER</p>
      </div>

      <div style={{background: 'white', padding: '16px', borderRadius: '16px', marginBottom: '20px'}}>
        <p><strong style={{color: '#5B21B6'}}>Transporter:</strong> {myTransporter.name}</p>
        <label style={{display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold'}}>
          <input type="checkbox" checked={isOnline} onChange={e => setIsOnline(e.target.checked)} style={{accentColor: '#5B21B6'}} />
          <span style={{color: isOnline? '#16a34a' : '#dc2626'}}>{isOnline? '🟢 ONLINE' : '🔴 OFFLINE'}</span>
        </label>
      </div>

      {activeTracker && isLive && (
        <div style={{background:'black', color:'white', padding:22, borderRadius:16, marginBottom:20, border: '2px solid #5B21B6'}}>
          <h2 style={{margin:0, color: '#A78BFA'}}>🟢 LIVE: {activeTracker}</h2>
          <p style={{fontSize:12}}>Client is watching you on map now!</p>
          <button onClick={stopTrip} style={{background:'#22c55e', color:'white', padding:'14px', width:'100%', borderRadius:10, border:'none', fontWeight:'900', marginTop:14}}>✅ COMPLETE DELIVERY</button>
        </div>
      )}

      {!activeTracker && <>
        <h2 style={{fontSize: '18px', color: '#5B21B6'}}>Nearby Orders</h2>
        {orders.map(order => (
          <div key={order.id} style={{border: '1px solid #EDE9FE', padding: '16px', borderRadius: '14px', marginBottom: '12px', background: 'white'}}>
            <strong>{order.id} - {order.client}</strong>
            <p>📍 {order.address}</p>
            <p style={{color: '#5B21B6', fontWeight: 'bold'}}>💰 {order.amount}</p>
            <button onClick={() => handleAccept(order.id)} style={{background: '#5B21B6', color: '#fff', padding: '13px', border: 'none', borderRadius: '10px', width: '100%', fontWeight:'800'}}>Accept Delivery</button>
          </div>
        ))}
      </>}
    </div>
  );
}