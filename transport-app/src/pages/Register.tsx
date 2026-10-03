import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [tab, setTab] = useState<"client" | "transporter">("transporter");
  const [form, setForm] = useState({
    fullName: "", firstName: "John", lastName: "Mukasa",
    phone: "", nationalId: "", permitNo: "",
    email: "", password: "", confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return alert("Passwords don't match");
    setLoading(true);
    try {
      const url = tab === "client" ? "http://127.0.0.1:8000/api/register" : "http://127.0.0.1:8000/api/transporter/register";
      const payload = tab === "client" 
        ? { name: form.fullName, phone: form.phone, email: form.email, password: form.password, role: "client" } 
        : { first_name: form.firstName, last_name: form.lastName, phone: form.phone, national_id: form.nationalId, driving_permit_no: form.permitNo, password: form.password, role: "transporter" };
      await axios.post(url, payload);
      alert("Account created!");
      navigate("/login");
    } catch (err: any) { alert(err.response?.data?.message || "Failed"); } finally { setLoading(false); }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 p-3" style={{backgroundColor:"#f5f3ff"}}>
      <div className="card shadow p-4" style={{maxWidth:"450px", width:"100%", borderRadius:"20px", border:"1px solid #E9D5FF"}}>
        
        <div className="btn-group mb-4 w-100" role="group">
          <button type="button" onClick={()=>setTab("client")} className={`btn ${tab==="client" ? "btn-dark" : "btn-outline-secondary"}`}>🛒 Client</button>
          <button type="button" onClick={()=>setTab("transporter")} className={`btn ${tab==="transporter" ? "btn-dark" : "btn-outline-secondary"}`}>🏍️ Transporter</button>
        </div>

        <h5 className="fw-bold text-center">{tab==="client" ? "Create Client Account" : "Transporter Registration"}</h5>
        <p className="text-muted small text-center mb-3">{tab==="client" ? "Order in minutes around Kampala" : "Join Deliver Uganda - TZ, DRC, Kenya, Rwanda, S. Sudan"}</p>

        <form onSubmit={handleSubmit}>
          {tab==="client" ? (
            <>
              <div className="mb-2"><label className="form-label small fw-bold">Full Name</label><input name="fullName" onChange={handleChange} className="form-control" style={{borderColor:"#E9D5FF"}} required /></div>
              <div className="mb-2"><label className="form-label small fw-bold">Phone</label><input name="phone" placeholder="07XXXXXXXX" onChange={handleChange} className="form-control" style={{borderColor:"#E9D5FF"}} required /></div>
              <div className="mb-2"><label className="form-label small fw-bold">Email</label><input name="email" type="email" onChange={handleChange} className="form-control" style={{borderColor:"#E9D5FF"}} /></div>
            </>
          ) : (
            <>
              <div className="mb-2"><label className="form-label small fw-bold">First Name</label><input name="firstName" defaultValue="John" onChange={handleChange} className="form-control" style={{borderColor:"#E9D5FF"}} required /></div>
              <div className="mb-2"><label className="form-label small fw-bold">Last Name</label><input name="lastName" defaultValue="Mukasa" onChange={handleChange} className="form-control" style={{borderColor:"#E9D5FF"}} required /></div>
              <div className="mb-2"><label className="form-label small fw-bold">Phone (for login)</label><input name="phone" placeholder="07XXXXXXXX" onChange={handleChange} className="form-control" style={{borderColor:"#E9D5FF"}} required /></div>
              <div className="mb-2"><label className="form-label small fw-bold">National ID</label><input name="nationalId" placeholder="CMXXXXXXXXXXXXXX" onChange={handleChange} className="form-control" style={{borderColor:"#E9D5FF"}} required /></div>
              <div className="mb-2"><label className="form-label small fw-bold">Driving Permit No.</label><input name="permitNo" placeholder="Optional" onChange={handleChange} className="form-control" style={{borderColor:"#E9D5FF"}} /></div>
            </>
          )}
          <div className="mb-2"><label className="form-label small fw-bold">Password</label><input name="password" type="password" onChange={handleChange} className="form-control" style={{borderColor:"#E9D5FF"}} required /></div>
          <div className="mb-3"><label className="form-label small fw-bold">Confirm Password</label><input name="confirmPassword" type="password" onChange={handleChange} className="form-control" style={{borderColor:"#E9D5FF"}} required /></div>
          <button disabled={loading} className="btn w-100 text-white fw-bold py-2" style={{backgroundColor:"#4F2AF7", borderRadius:"12px"}}>{loading ? "Please wait..." : tab==="client" ? "CREATE ACCOUNT" : "REGISTER AS TRANSPORTER"}</button>
        </form>

        <p className="text-center small mt-3">Already have account? <Link to="/login" className="fw-bold">Login</Link></p>
      </div>
    </div>
  );
}