import { useState, useEffect } from "react";
import { filterNearbyOrders } from "../hooks/useNearbyOrders";

// Mock - replace with your backend later
const MOCK_ORDERS = [
  { id: 'ORD-001', customer: 'Sarah', lat: 0.3476, lng: 32.5825, address: 'Nakasero, Kampala', amount: '15,000 UGX' },
  { id: 'ORD-002', customer: 'John', lat: 0.3136, lng: 32.5811, address: 'Kabalagala', amount: '12,000 UGX' },
  { id: 'ORD-003', customer: 'Amina', lat: 0.4244, lng: 32.5858, address: 'Kawempe - FAR', amount: '20,000 UGX' },
];

export default function RiderDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  // Mock rider location - Central Kampala
  const [myRider] = useState({ lat: 0.3476, lng: 32.5825, name: 'Muzzukulu' });
  const [orders, setOrders] = useState(MOCK_ORDERS);

  const nearbyOrders = filterNearbyOrders(orders, myRider);

  const handleAccept = (orderId) => {
    alert(`Accepted ${orderId}! Ride to customer! 🛵`);
    setOrders(orders.filter(o => o.id!== orderId));
  };

  return (
    <div style={{padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto'}}>
      <h1>🛵 Deliver Uganda</h1>
      <div style={{background: '#f0f0f0', padding: '15px', borderRadius: '10px', marginBottom: '20px'}}>
        <p><strong>Rider:</strong> {myRider.name}</p>
        <p><strong>Location:</strong> {myRider.lat}, {myRider.lng} (Kampala)</p>
        <label style={{display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px'}}>
          <input type="checkbox" checked={isOnline} onChange={e => setIsOnline(e.target.checked)} />
          {isOnline? '🟢 ONLINE - Receiving orders' : '🔴 OFFLINE'}
        </label>
      </div>

      <h2>Nearby Orders ({isOnline? nearbyOrders.length : 0})</h2>
      <p style={{fontSize: '12px', color: '#666'}}>Showing orders within 5km using your coverage.js filter</p>

      {!isOnline && <p>Go online to see orders</p>}

      {isOnline && nearbyOrders.map(order => (
        <div key={order.id} style={{border: '1px solid #ddd', padding: '15px', borderRadius: '10px', marginBottom: '10px'}}>
          <strong>{order.id} - {order.customer}</strong>
          <p>📍 {order.address}</p>
          <p>💰 {order.amount}</p>
          <button onClick={() => handleAccept(order.id)} style={{background: '#000', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%'}}>
            Accept Delivery
          </button>
        </div>
      ))}

      {isOnline && nearbyOrders.length === 0 && <p>No nearby orders. Move closer to city center!</p>}
    </div>
  );
}
