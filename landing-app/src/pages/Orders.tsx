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
    // fetch customer orders if you have endpoint
    // fetch(`${API}/my-orders`) ...
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{minHeight:'100vh', background:'#f8f7ff', padding:'20px'}}>
      <div style={{maxWidth:'900px', margin:'0 auto'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
          <h1 style={{fontSize:'24px', fontWeight:800, color:'#2d1654'}}>🛒 My Orders</h1>
          <button onClick={logout} style={{padding:'8px 16px', borderRadius:'8px', border:'1px solid #e2e8f0', background:'white', cursor:'pointer'}}>Logout</button>
        </div>

        <div style={{background:'white', borderRadius:'16px', padding:'24px', border:'1px solid #ede9ff'}}>
          <p>Welcome {user?.name || user?.first_name || 'Customer'}! 👋</p>
          <p style={{color:'#64748b', marginTop:'8px'}}>Your phone: {user?.phone}</p>
          
          <div style={{marginTop:'20px', display:'grid', gap:'12px'}}>
            <Link to="/packages" style={{background:'linear-gradient(135deg, #7c3aed, #5b21b6)', color:'white', padding:'14px', borderRadius:'12px', textAlign:'center', textDecoration:'none', fontWeight:700}}>📦 Order New Package</Link>
            <Link to="/" style={{background:'#f1f0ff', color:'#5b21b6', padding:'14px', borderRadius:'12px', textAlign:'center', textDecoration:'none', fontWeight:700}}>🏠 Back to Home</Link>
          </div>

          <p style={{marginTop:'24px', color:'#8a7bb5', fontSize:'13px'}}>No orders yet. Your orders will appear here after you order.</p>
        </div>
      </div>
    </div>
  );
}