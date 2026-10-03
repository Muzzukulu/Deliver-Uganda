import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MERCHANT_CODES, calculateSplit } from "../config/payments";
import { paymentService } from "../services/paymentService";

export default function TransporterDashboard() {
  const navigate = useNavigate();
  const [online, setOnline] = useState(true);
  const [accepted, setAccepted] = useState(false);

  const order = {
    id: "DU-1665-8Q",
    from: "Kampala",
    to: "Entebbe",
    clientCode: "Client-8Q",
    price: 15000,
    priceLabel: "15,000 UGX",
    transporterMerchantCodes: { mtn: null as string | null, airtel: null as string | null }
  };

  const split = calculateSplit(order.price);

  const handleLogout = () => {
    localStorage.removeItem("user"); localStorage.removeItem("token");
    localStorage.removeItem("activeOrder"); setOnline(false); navigate("/");
  };
  const handleAccept = () => {
    setAccepted(true); localStorage.setItem("activeOrder", JSON.stringify(order));
    setTimeout(() => navigate(`/track/${order.id}`), 800);
  };
  const handleComplete = () => {
    alert(`Delivery Completed! ✅\nYou received: ${split.transporterAmount.toLocaleString()} UGX`);
    localStorage.removeItem("activeOrder"); setOnline(false); setAccepted(false); navigate("/");
  };

  return (
    <div style={{ minHeight:"100vh", width:"100%", backgroundColor:"#f5f3ff", display:"flex", justifyContent:"center", alignItems:"center", padding:"16px", boxSizing:"border-box" }}>
      <div className="card shadow-lg" style={{ width:"100%", maxWidth:"380px", borderRadius:"24px", border:"1px solid #E9D5FF", padding:"20px", backgroundColor:"white", boxSizing:"border-box", overflow:"hidden" }}>
        
        <div className="text-center mb-4">
          <h1 style={{ color:"#5B21B6", fontWeight:"900", fontSize:"32px", margin:"0", lineHeight:"1.1" }}>
            <span style={{fontSize:"42px", display:"block", marginBottom:"6px"}}>📦</span>Deliver Uganda
          </h1>
          <span className="badge mt-2" style={{background:"#ede9fe", color:"#5B21B6", padding:"6px 14px", borderRadius:"20px", fontSize:"11px"}}>TRANSPORTER • PRIVATE</span>
        </div>

        <div className="text-center p-3 mb-3" style={{ border:"1px solid #E9D5FF", borderRadius:"16px", background:"#ffffff" }}>
          <div className="fw-bold" style={{color:"#5B21B6", fontSize:"15px"}}>ORDER: {order.id}</div>
          <div className="mt-1" style={{fontSize:"13px"}}>🔒 Private Mode - Name Hidden</div>
          <div className="mt-2 d-flex justify-content-center align-items-center gap-2">
            <input type="checkbox" checked={online} onChange={(e)=>setOnline(e.target.checked)} />
            <span className={`fw-bold ${online ? 'text-success' : 'text-danger'}`} style={{fontSize:"14px"}}>{online ? '🟢 ONLINE' : '🔴 OFFLINE'}</span>
          </div>
        </div>

        {online && !accepted && (
          <div className="p-3 mb-3" style={{background:"#faf5ff", borderRadius:"16px", border:"1px solid #E9D5FF"}}>
            <div className="fw-bold" style={{color:"#5B21B6", fontSize:"14px"}}>Nearby Orders</div>
            <div className="fw-bold mt-1" style={{fontSize:"14px"}}>{order.id} - {order.clientCode}</div>
            <div style={{fontSize:"14px"}}>📍 {order.from} → {order.to}</div>
            
            <div className="mt-3 p-3" style={{background:"white", borderRadius:"12px", border:"1px dashed #E9D5FF"}}>
              <div className="fw-bold text-center" style={{color:"#5B21B6", fontSize:"15px"}}>💰 Total: {order.priceLabel}</div>
              
              <div className="mt-2" style={{fontSize:"13px", lineHeight:"1.8"}}>
                <div className="d-flex justify-content-between"><span>🚐 Transporter (80%)</span><span className="fw-bold text-success">{split.transporterAmount.toLocaleString()} UGX</span></div>
                <div className="text-muted" style={{fontSize:"11px", marginLeft:"18px"}}>Code: {order.transporterMerchantCodes.mtn || "⏳ Pending - DB"}</div>
                <div className="d-flex justify-content-between mt-1"><span>📦 Platform (15%)</span><span className="fw-bold" style={{color:"#5B21B6"}}>{split.platformAmount.toLocaleString()} UGX</span></div>
                <div className="text-muted" style={{fontSize:"11px", marginLeft:"18px"}}>{MERCHANT_CODES.MTN.PLATFORM}</div>
                <div className="d-flex justify-content-between mt-1 text-muted"><span>💳 Fees (5%)</span><span>{split.feesAmount.toLocaleString()} UGX</span></div>
              </div>

              {!split.isReadyForAutoSplit && (
                <div className="alert alert-warning mt-2 py-2 mb-0" style={{fontSize:"11px", borderRadius:"8px"}}>⚠️ Dev Mode: Personal MoMo until merchant codes issued</div>
              )}

              <div className="d-flex gap-2 mt-3">
                <button onClick={()=>paymentService.payOrder(order.price, 'MTN')} className="btn w-50 fw-bold" style={{borderRadius:"10px", fontSize:"13px", padding:"10px", background:"#FFCC00", color:"black", border:"none"}}>
                  MTN MoMo Pay
                </button>
                <button onClick={()=>paymentService.payOrder(order.price, 'AIRTEL')} className="btn w-50 fw-bold" style={{borderRadius:"10px", fontSize:"13px", padding:"10px", background:"#8B0000", color:"white", border:"none"}}>
                  Airtel Pay
                </button>
              </div>
            </div>

            {/* ALIGNED ACCEPT BUTTON - CENTERED PERFECTLY */}
            <div className="d-flex justify-content-center" style={{marginTop:"12px", width:"100%"}}>
              <button onClick={handleAccept} className="btn w-100 fw-bold text-white" style={{background:"#4F2AF7", borderRadius:"12px", fontSize:"15px", padding:"12px", maxWidth:"100%"}}>
                Accept - You get {split.transporterAmount.toLocaleString()} UGX
              </button>
            </div>
          </div>
        )}

        <div className="text-center p-3 mb-3" style={{background:"#111827", color:"white", borderRadius:"16px"}}>
          <div className="fw-bold" style={{color:"#a78bfa", fontSize:"14px"}}>LIVE: {online ? order.id : 'Offline'}</div>
          <div style={{fontSize:"12px", color:"#9ca3af"}}>{online ? 'Client is watching order on map now!' : 'You are offline'}</div>
          {accepted && (
            <button onClick={handleComplete} className="btn btn-success w-100 mt-3 fw-bold" style={{borderRadius:"12px", fontSize:"14px", padding:"10px"}}>
              ✅ COMPLETE DELIVERY - {split.transporterAmount.toLocaleString()} UGX
            </button>
          )}
        </div>

        <button onClick={handleLogout} className="btn btn-outline-dark w-100 fw-bold mb-2" style={{borderRadius:"12px", fontSize:"14px", padding:"10px"}}>🚪 LOGOUT / GO HOME</button>
        <div className="text-center"><small className="text-muted" onClick={()=>navigate("/")} style={{cursor:"pointer", fontSize:"12px"}}>← Back to Landing Page</small></div>
      </div>
    </div>
  );
}