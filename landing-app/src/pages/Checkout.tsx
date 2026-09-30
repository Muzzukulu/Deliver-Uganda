import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const pkgName = searchParams.get("package") || "pro";

  const packages = {
    basic: { name: "Basic", price: 110000, deliveries: 20 },
    pro: { name: "Pro", price: 250000, deliveries: 50 },
    enterprise: { name: "Enterprise", price: 450000, deliveries: 100 },
  };

  const selected = packages[pkgName] || packages.pro;
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  const handlePay = async () => {
    if(phone.length < 10) return alert("Enter valid MTN/Airtel number");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaid(true);
    }, 2000);
  };

  if(paid){
    return (
      <div style={{minHeight:"100vh", display:"grid", placeItems:"center", background:"#f8fafc", padding:"20px"}}>
        <div style={{background:"white", padding:"40px", borderRadius:"24px", textAlign:"center", maxWidth:"400px", boxShadow:"0 20px 60px rgba(0,0,0,0.08)"}}>
          <div style={{fontSize:"60px"}}>✅</div>
          <h2 style={{fontFamily:"'Outfit', sans-serif", fontSize:"28px", color:"#1e1b4b"}}>Payment Request Sent!</h2>
          <p style={{color:"#64748b"}}>Check your phone <b>{phone}</b> and enter PIN to pay <b>{selected.price.toLocaleString()} UGX</b> for {selected.name}</p>
          <Link to="/dashboard" style={{display:"inline-block", marginTop:"20px", background:"#7c3aed", color:"white", padding:"12px 24px", borderRadius:"12px", textDecoration:"none", fontWeight:700}}>Go to Dashboard</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight:"100vh", background:"#f8fafc", padding:"40px 20px", fontFamily:"'Plus Jakarta Sans', sans-serif"}}>
      <div style={{maxWidth:"440px", margin:"0 auto", background:"white", borderRadius:"24px", padding:"28px", boxShadow:"0 10px 40px rgba(0,0,0,0.06)", border:"1px solid #e2e8f0"}}>
        <Link to="/packages" style={{color:"#7c3aed", textDecoration:"none", fontSize:"14px", fontWeight:600}}>← Back to Packages</Link>
        <h1 style={{fontFamily:"'Outfit', sans-serif", fontSize:"26px", margin:"16px 0 6px", color:"#1e1b4b"}}>Checkout</h1>
        <div style={{background:"#f5f3ff", borderRadius:"14px", padding:"16px", marginBottom:"20px", border:"1px solid #ede9fe"}}>
          <div style={{display:"flex", justifyContent:"space-between"}}><span style={{color:"#64748b"}}>Package</span><b style={{color:"#1e1b4b"}}>{selected.name} - {selected.deliveries} deliveries</b></div>
          <div style={{display:"flex", justifyContent:"space-between", marginTop:"8px", fontSize:"18px"}}><span>Total</span><b style={{color:"#7c3aed"}}>{selected.price.toLocaleString()} UGX</b></div>
          <div style={{fontSize:"12px", color:"#16a34a", marginTop:"6px", fontWeight:700}}>You save ~{(selected.deliveries * 1500).toLocaleString()} UGX</div>
        </div>
        <label style={{fontSize:"13px", fontWeight:700, color:"#334155"}}>MTN / Airtel Number</label>
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="0772 123 456" style={{width:"100%", padding:"14px", borderRadius:"12px", border:"1px solid #cbd5e1", margin:"8px 0 18px", fontSize:"16px", boxSizing:"border-box"}}/>
        <button onClick={handlePay} disabled={loading} style={{width:"100%", padding:"15px", borderRadius:"12px", border:"none", background: loading? "#a78bfa" : "#7c3aed", color:"white", fontWeight:800, fontSize:"16px", cursor:"pointer"}}>
          {loading? "Sending MoMo Prompt..." : `Pay ${selected.price.toLocaleString()} UGX`}
        </button>
        <div style={{textAlign:"center", marginTop:"14px", fontSize:"12px", color:"#94a3b8"}}>Secured by MTN MoMo • Cluster Delivery UG</div>
      </div>
    </div>
  );
}