import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({ phone: '', password: '' });
  const [focused, setFocused] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('customer');
  const navigate = useNavigate();

  // AUTO-REDIRECT IF ALREADY LOGGED IN - NO MORE RETYPING!
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');
    if (token) {
      navigate(savedRole === 'customer'? '/' : '/dashboard');
    }
  }, [navigate]);

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API = import.meta.env.VITE_API_URL || 'http://10.199.18.117:8000/api';
      const url = role === 'customer'? `${API}/login` : `${API}/driver/login`;

      const res = await axios.post(url, form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.driver || res.data.user || res.data.client));
      localStorage.setItem('role', role);
      // also save for browser autofill memory
      localStorage.setItem('lastPhone', form.phone);
      navigate(role === 'customer'? '/orders' : '/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  const getInputStyle = (name) => ({
    padding:"13px 14px", borderRadius:"12px",
    border: focused === name? "1px solid #7c3aed" : "1px solid #e2e8f0",
    outline:"none", fontSize:"14px", width:"100%", boxSizing:"border-box",
    fontFamily:"'Plus Jakarta Sans', sans-serif",
    background: focused === name? "#faf5ff" : "#f8fafc",
    transition:"all 0.2s",
    boxShadow: focused === name? "0 0 0 3px rgba(124,58,237,0.1)" : "none"
  });

  return (
    <div style={{fontFamily:"'Plus Jakarta Sans', sans-serif", minHeight:"100vh", background:"#f8fafc", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px"}}>
      <div style={{width:"100%", maxWidth:"440px", background:"white", borderRadius:"24px", padding:"32px", boxShadow:"0 20px 60px rgba(0,0,0,0.08)", border:"1px solid #eef2f7"}}>
        <div style={{width:"48px", height:"48px", borderRadius:"14px", background:"linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"16px", fontSize:"22px"}}>🛵</div>

        <div style={{display:'flex', gap:'10px', marginBottom:'20px', background:'#f1f0ff', padding:'6px', borderRadius:'12px'}}>
          <button type="button" onClick={()=>setRole('customer')} style={{flex:1, padding:'10px', borderRadius:'8px', border:'none', cursor:'pointer', fontWeight:700, background: role==='customer'? 'white' : 'transparent', boxShadow: role==='customer'? '0 2px 8px rgba(0,0,0,0.1)' : 'none'}}>🛒 Customer</button>
          <button type="button" onClick={()=>setRole('driver')} style={{flex:1, padding:'10px', borderRadius:'8px', border:'none', cursor:'pointer', fontWeight:700, background: role==='driver'? 'white' : 'transparent', boxShadow: role==='driver'? '0 2px 8px rgba(0,0,0,0.1)' : 'none'}}>🏍️ Pro Driver</button>
        </div>

        <h1 style={{fontFamily:"'Outfit', sans-serif", fontSize:"28px", fontWeight:700, marginBottom:"6px", color:"#1e1b4b"}}>Welcome Back</h1>
        <p style={{color:"#64748b", marginBottom:"24px"}}>Login as {role === 'customer'? 'Customer' : 'Pro Driver'}</p>

        <form onSubmit={handleSubmit} style={{display:"grid", gap:"16px"}}>
          <input name="phone" placeholder="Phone 0700000001" value={form.phone} onChange={handleChange} onFocus={()=>setFocused('phone')} onBlur={()=>setFocused('')} required style={getInputStyle('phone')} />

          <div style={{position:"relative", width:"100%"}}>
            <input
              name="password"
              type={showPassword? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              onFocus={()=>setFocused('password')}
              onBlur={()=>setFocused('')}
              required
              style={{...getInputStyle('password'), paddingRight:"42px"}}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position:"absolute", right:"12px", top:"50%",
                transform:"translateY(-50%)", cursor:"pointer",
                fontSize:"18px", userSelect:"none"
              }}
            >
              {showPassword? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit" style={{marginTop:"8px", background:"linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)", color:"white", padding:"14px", borderRadius:"12px", border:"none", fontWeight:700, fontSize:"15px", cursor:"pointer", fontFamily:"'Outfit', sans-serif", boxShadow:"0 10px 25px rgba(124,58,237,0.35)"}}>Login →</button>
        </form>

        <p style={{textAlign:"center", marginTop:"20px", color:"#64748b", fontSize:"14px"}}>No account? <Link to="/register" style={{color:"#7c3aed", fontWeight:700, textDecoration:"none"}}>Create account</Link></p>
      </div>
    </div>
  );
}