import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(savedUser);
    
    fetch('http://localhost:8000/api/orders')
      .then(r=>r.json())
      .then(d=> setOrders(Array.isArray(d)? d : d.data || []))
      .catch(()=>{});
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{minHeight:'100vh', background:'#f8f7ff', padding:'20px'}}>
      <div style={{maxWidth:'900px', margin:'0 auto'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
          <h1 style={{fontSize:'24px', fontWeight:800, color:'#2d1654'}}>🛒 My Orders • USD Engine Live</h1>
          <button onClick={logout} style={{padding:'8px 16px', borderRadius:'8px', border:'1px solid #e2e8f0', background:'white', cursor:'pointer'}}>Logout</button>
        </div>

        <div style={{background:'white', borderRadius:'16px', padding:'24px', border:'1px solid #ede9ff'}}>
          <p>Welcome {user?.name || user?.first_name || 'Customer'}! 👋</p>
          <p style={{color:'#64748b', marginTop:'8px'}}>Phone: {user?.phone} • Rate: 3850</p>

          <div style={{marginTop:'20px', display:'grid', gap:'12px'}}>
            {orders.length === 0 ? (
              <p style={{color:'#8a7bb5', fontSize:'13px'}}>No orders yet. Place one from Dashboard!</p>
            ) : (
              orders.map(o=>(
                <div key={o.id} style={{border:'1px solid #ede9fe', borderRadius:12, padding:14, background:'#fbfbff'}}>
                  <div style={{display:'flex', justifyContent:'space-between'}}>
                    <b>#{o.id} • {o.pickup_address} → {o.dropoff_address}</b>
                    <span style={{fontSize:12, background:o.status==='completed'?'#dcfce7':'#fef9c3', padding:'4px 8px', borderRadius:99}}>{o.status}</span>
                  </div>
                  <div style={{marginTop:8, fontSize:14, lineHeight:'20px'}}>
                    <div>Total: <b>${o.price_usd || o.delivery_fee_usd} USD</b> <span style={{color:'#64748b'}}>({(o.price_ugx || o.price || 0).toLocaleString()} UGX)</span></div>
                    <div style={{fontSize:12, color:'#16a34a'}}>Rider earned: ${o.driver_commission_usd} USD ({o.rider_payout?.toLocaleString()} UGX) • You helped rider keep 70%!</div>
                  </div>
                </div>
              ))
            )}
            <Link to="/packages" style={{background:'linear-gradient(135deg, #7c3aed, #5b21b6)', color:'white', padding:'14px', borderRadius:'12px', textAlign:'center', textDecoration:'none', fontWeight:700}}>📦 Order New Package</Link>
            <Link to="/" style={{background:'#f1f0ff', color:'#5b21b6', padding:'14px', borderRadius:'12px', textAlign:'center', textDecoration:'none', fontWeight:700}}>🏠 Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}