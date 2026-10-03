import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Track() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [distance, setDistance] = useState(2.3);

  useEffect(()=>{
    const interval = setInterval(()=> setDistance(d=> Math.max(0.1, d-0.1)), 2000);
    return ()=> clearInterval(interval);
  },[]);

  const order = JSON.parse(localStorage.getItem("activeOrder") || '{"client":"Sarah","from":"Kampala","to":"Entebbe"}');

  return (
    <div className="min-vh-100 p-3" style={{backgroundColor:"#f5f3ff"}}>
      <div className="container" style={{maxWidth:"420px"}}>
        <h5 className="text-center fw-bold" style={{color:"#4F2AF7"}}>LIVE Tracking: {id}</h5>
        
        <div className="card p-3 mb-3 shadow-sm" style={{borderRadius:"16px"}}>
          <div className="d-flex justify-content-between">
            <div><strong>Transporter:</strong> Muzzukulu 🏍️</div>
            <span className="badge bg-success">LIVE</span>
          </div>
          <div className="small mt-1">{order.from} → {order.to} • Client: {order.client}</div>
          <div className="fw-bold mt-1" style={{color:"#16a34a"}}>📍 {distance.toFixed(1)}km away • {Math.ceil(distance*3)} mins</div>
        </div>

        <div className="card shadow mb-3 d-flex justify-content-center align-items-center" style={{height:"340px", borderRadius:"20px", background:"#e0e7ff"}}>
          <div className="text-center">
            <div style={{fontSize:"48px"}}>🗺️</div>
            <div className="bg-white rounded-pill px-3 py-1 shadow-sm mt-2 small">🏍️ Muzzukulu moving LIVE</div>
            <div className="mt-2 small text-muted">Kampala → Entebbe road</div>
          </div>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-dark w-50" onClick={()=>navigate("/")}>🏠 Home</button>
          <button className="btn btn-success w-50 fw-bold" onClick={()=>{ alert("Delivery Confirmed! ✅"); navigate("/"); }}>Confirm Delivery</button>
        </div>
      </div>
    </div>
  );
}