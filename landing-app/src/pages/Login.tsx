import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [tab, setTab] = useState<"client" | "transporter">("transporter");
  const [form, setForm] = useState({ phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e:any) => setForm({...form, [e.target.name]: e.target.value});
  
  const handleSubmit = async (e:any) => {
    e.preventDefault(); 
    setLoading(true);
    try {
      const endpoint = "http://127.0.0.1:8000/api/login";
      // FIXED: was url, now endpoint
      const res = await axios.post(endpoint, { 
        phone: form.phone, 
        password: form.password, 
        role: tab 
      });
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", tab);
      
      alert(`Welcome ${tab}!`);
      
      if(tab==="transporter") navigate("/transporter/dashboard");
      else navigate("/client/dashboard");
      
    } catch(err:any) { 
      console.log(err.response?.data);
      alert(JSON.stringify(err.response?.data) || "Login failed"); 
    }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#f5f3ff] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[420px] rounded-[24px] shadow-xl border border-purple-100 p-8">
        <div className="text-center mb-6">
          <div className="text-[14px] text-[#4F2AF7] font-medium">Welcome Back</div>
          <div className="text-[15px] mt-1">Login to Deliver Uganda</div>
        </div>
        <div className="flex gap-2 mb-6">
          <button onClick={()=>setTab("client")} className={`flex-1 py-2.5 rounded-xl font-bold text-sm ${tab==="client"?"bg-black text-white":"bg-gray-100"}`}>🛒 Client</button>
          <button onClick={()=>setTab("transporter")} className={`flex-1 py-2.5 rounded-xl font-bold text-sm ${tab==="transporter"?"bg-black text-white":"bg-gray-100"}`}>🏍️ Transporter</button>
        </div>
        <h6 className="font-bold text-center mb-4">{tab==="client"?"Client Login":"Transporter Login"}</h6>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="text-sm font-bold">Phone Number</label><input name="phone" onChange={handleChange} placeholder="07XXXXXXXX" className="w-full border border-purple-200 rounded-xl p-3 mt-1" required/></div>
          <div><label className="text-sm font-bold">Password</label><input name="password" type="password" onChange={handleChange} placeholder="Enter password" className="w-full border border-purple-200 rounded-xl p-3 mt-1" required/></div>
          <button disabled={loading} className="w-full bg-[#4F2AF7] text-white font-bold py-3 rounded-xl">{loading?"Logging in...":`LOGIN AS ${tab.toUpperCase()}`}</button>
        </form>
        <p className="text-center text-sm mt-5">Don't have account? <Link to="/register" className="font-bold text-[#4F2AF7]">Register</Link></p>
        <p className="text-center text-sm mt-2 text-gray-500">Forgot password?</p>
      </div>
    </div>
  );
}