import { Link } from "react-router-dom";

export default function Packages() {
  const pkgs = [
    { id:"basic", name:"Basic", price:"110,000", deliveries:"20", save:"Pay as you go alternative", popular:false },
    { id:"pro", name:"Pro", price:"250,000", deliveries:"50", save:"Most Popular", popular:true },
    { id:"enterprise", name:"Enterprise", price:"450,000", deliveries:"100", save:"Best Value", popular:false },
  ];

  return (
    <div style={{minHeight:"100vh", background:"#f8fafc", padding:"40px 20px", fontFamily:"'Plus Jakarta Sans', sans-serif"}}>
      <div style={{maxWidth:"1100px", margin:"0 auto"}}>
        <Link to="/" style={{color:"#7c3aed", fontWeight:700, textDecoration:"none"}}>← Back Home</Link>
        <h1 style={{fontFamily:"'Outfit', sans-serif", fontSize:"36px", textAlign:"center", color:"#1e1b4b", margin:"20px 0 8px"}}>Choose Your Growth Package</h1>
        <p style={{textAlign:"center", color:"#64748b", marginBottom:"36px"}}>Save up to 40% vs per-delivery pricing</p>
        
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:"20px"}}>
          {pkgs.map(p=>(
            <div key={p.id} style={{background:"white", borderRadius:"20px", padding:"24px", border: p.popular ? "2px solid #7c3aed" : "1px solid #e2e8f0", boxShadow:"0 10px 30px rgba(0,0,0,0.05)", position:"relative"}}>
              {p.popular && <div style={{position:"absolute", top:"-12px", left:"50%", transform:"translateX(-50%)", background:"#7c3aed", color:"white", padding:"4px 12px", borderRadius:"20px", fontSize:"12px", fontWeight:800}}>MOST POPULAR</div>}
              <h3 style={{fontSize:"22px", margin:"10px 0", color:"#1e1b4b"}}>{p.name}</h3>
              <div style={{fontSize:"32px", fontWeight:900, color:"#1e1b4b"}}>{p.price}<span style={{fontSize:"14px", fontWeight:600, color:"#64748b"}}> UGX</span></div>
              <div style={{color:"#7c3aed", fontWeight:700, margin:"6px 0"}}>{p.deliveries} deliveries</div>
              <div style={{fontSize:"13px", color:"#16a34a", fontWeight:600, marginBottom:"20px"}}>{p.save}</div>
              <Link to={`/checkout?package=${p.id}`} style={{display:"block", textAlign:"center", padding:"13px", borderRadius:"12px", background: p.popular ? "#7c3aed" : "white", color: p.popular ? "white" : "#7c3aed", border:"1.5px solid #7c3aed", fontWeight:800, textDecoration:"none"}}>Choose {p.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}