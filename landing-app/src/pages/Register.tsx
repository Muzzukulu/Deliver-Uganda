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
      const endpoint = "http://127.0.0.1:8000/api/register";
      
      const payload = tab === "client" ? {
        name: form.fullName,
        phone: form.phone,
        email: form.email,
        password: form.password,
        password_confirmation: form.confirmPassword,
        role: "client"
      } : {
        name: `${form.firstName} ${form.lastName}`,
        phone: form.phone,
        national_id: form.nationalId,
        driving_permit_no: form.permitNo,
        password: form.password,
        password_confirmation: form.confirmPassword,
        role: "transporter"
      };

      await axios.post(endpoint, payload);
      alert("Account created! Now login");
      navigate("/login");
    } catch (err: any) {
      console.log(err.response?.data);
      alert(JSON.stringify(err.response?.data) || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-[#E9D5FF] focus:border-[#A78BFA] focus:ring-2 focus:ring-[#E9D5FF] outline-none rounded-lg p-2.5 mt-1 bg-white transition";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f3ff] p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md border border-[#F3E8FF]">
        <div className="flex bg-[#F5F3FF] rounded-xl p-1 mb-6">
          <button onClick={() => setTab("client")} className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${tab === "client" ? "bg-white shadow border border-[#E9D5FF]" : "border border-transparent text-gray-600"}`}>🛒 Client</button>
          <button onClick={() => setTab("transporter")} className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${tab === "transporter" ? "bg-white shadow border border-[#E9D5FF]" : "border border-transparent text-gray-600"}`}>🏍️ Pro Transporter</button>
        </div>

        <h2 className="text-xl font-bold text-[#2d0a5a] mb-1">{tab === "client" ? "Create Client Account" : "Transporter Registration"}</h2>
        <p className="text-xs text-gray-500 mb-4">{tab === "client" ? "Order in minutes around Kampala" : "Join Deliver Uganda - Transport to TZ, DRC, Kenya, Rwanda, S. Sudan"}</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          {tab === "client" ? (
            <>
              <div><label className="text-sm font-medium">Full Name</label><input name="fullName" onChange={handleChange} className={inputClass} required /></div>
              <div><label className="text-sm font-medium">Phone</label><input name="phone" placeholder="0774..." onChange={handleChange} className={inputClass} required /></div>
              <div><label className="text-sm font-medium">Email</label><input name="email" type="email" onChange={handleChange} className={inputClass} /></div>
            </>
          ) : (
            <>
              <div><label className="text-sm font-medium">First Name</label><input name="firstName" defaultValue="John" onChange={handleChange} className={inputClass} required /></div>
              <div><label className="text-sm font-medium">Last Name</label><input name="lastName" defaultValue="Mukasa" onChange={handleChange} className={inputClass} required /></div>
              <div><label className="text-sm font-medium">Phone (for login)</label><input name="phone" placeholder="07XXXXXXXX" onChange={handleChange} className={inputClass} required /></div>
              <div><label className="text-sm font-medium">National ID</label><input name="nationalId" placeholder="CMXXXXXXXXXXXXXX" onChange={handleChange} className={inputClass} required /></div>
              <div><label className="text-sm font-medium">Driving Permit No.</label><input name="permitNo" placeholder="Optional" onChange={handleChange} className={inputClass} /></div>
            </>
          )}
          <div><label className="text-sm font-medium">Password</label><input name="password" type="password" onChange={handleChange} className={inputClass} required /></div>
          <div><label className="text-sm font-medium">Confirm Password</label><input name="confirmPassword" type="password" onChange={handleChange} className={inputClass} required /></div>
          <button disabled={loading} className="w-full bg-[#4F2AF7] hover:bg-[#3d1ab5] text-white font-bold py-3 rounded-xl mt-2 transition">
            {loading ? "Please wait..." : tab === "client" ? "CREATE ACCOUNT" : "REGISTER AS TRANSPORTER"}
          </button>
        </form>
        <p className="text-center text-xs mt-4 text-gray-600">Already have account? <Link to="/login" className="font-bold underline text-black">Login</Link></p>
      </div>
    </div>
  );
}