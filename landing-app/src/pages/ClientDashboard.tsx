import { useState, useEffect } from "react";

export default function ClientDashboard() {
  const [status, setStatus] = useState("ON THE WAY");
  const transporter = { name: "Muzzukulu", phone: "07XXXXXXXX", plate: "UAX 123A", rating: "4.9 ⭐" };

  return (
    <div className="min-vh-100 p-3" style={{backgroundColor:"#f5f3ff"}}>
      <div className="container" style={{maxWidth:"500px"}}>
        
        {/* Header */}
        <div className="text-center mb-3">
          <h4 className="fw-bold" style={{color:"#4F2AF7"}}>Deliver Uganda</h4>
          <span className="badge bg-white text-dark border" style={{borderColor:"#E9D5FF !important"}}>CLIENT TRACKING</span>
        </div>

        {/* Transporter Card — Same as your screenshot but for Client */}
        <div className="card p-3 mb-3 shadow-sm" style={{borderRadius:"16px", border:"1px solid #E9D5FF"}}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <small className="text-muted">Your Transporter</small>
              <h6 className="fw-bold mb-0" style={{color:"#4F2AF7"}}>{transporter.name} 🏍️</h6>
              <small>{transporter.plate} • {transporter.rating}</small>
            </div>
            <div className="text-end">
              <span className="badge bg-success rounded-pill"><span className="me-1">🟢</span> LIVE</span>
              <div className="small fw-bold mt-1" style={{color:"#16a34a"}}>{status}</div>
            </div>
          </div>
        </div>

        {/* MAP — Client watching */}
        <div className="card mb-3 shadow" style={{borderRadius:"20px", overflow:"hidden", border:"1px solid #E9D5FF", height:"320px", background:"#e0e7ff"}}>
          <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center position-relative">
            <div className="position-absolute top-0 w-100 p-2 d-flex justify-content-between">
              <span className="badge bg-dark">LIVE: Tracking</span>
              <span className="badge bg-white text-dark">Kampala • Ntinda</span>
            </div>
            
            {/* Fake map dot moving */}
            <div style={{fontSize:"40px"}}>🗺️</div>
            <div className="bg-white px-3 py-1 rounded-pill shadow-sm small fw-bold mt-2">
              🏍️ Muzzukulu is 2.3km away • 7 mins
            </div>
            
            <div className="position-absolute bottom-0 w-100 p-2">
              <div className="progress" style={{height:"6px"}}>
                <div className="progress-bar" style={{width:"65%", backgroundColor:"#4F2AF7"}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="card p-3 shadow-sm" style={{borderRadius:"16px", border:"1px solid #E9D5FF"}}>
          <div className="d-flex gap-2 mb-3">
            <button className="btn btn-outline-dark w-50 fw-bold" style={{borderRadius:"12px"}}>📞 Call</button>
            <button className="btn btn-outline-dark w-50 fw-bold" style={{borderRadius:"12px"}}>💬 Chat</button>
          </div>
          
          <button onClick={()=>setStatus("DELIVERED ✅")} className="btn w-100 text-white fw-bold py-2" style={{backgroundColor:"#22c55e", borderRadius:"12px"}}>
            ✅ CONFIRM DELIVERY
          </button>
          
          <p className="text-center small text-muted mt-2 mb-0">Client is watching Muzzukulu on map now!</p>
        </div>

      </div>
    </div>
  );
}