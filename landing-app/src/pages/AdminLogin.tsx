import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://127.0.0.1:8000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid admin credentials");
      
      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));
      navigate("/admin/dashboard"); // or /admin
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2D0F4D] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl">
        <h1 className="text-2xl font-bold text-center text-[#2D0F4D]">Admin Access</h1>
        <p className="text-center text-sm text-gray-500 mb-6">Deliver Uganda Internal Only</p>
        
        {error && <div className="bg-red-100 text-red-600 p-3 rounded-xl text-sm mb-4">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="Admin Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-[#E9D5FF] rounded-xl px-4 py-3 outline-none focus:border-[#5B1E9A]" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-[#E9D5FF] rounded-xl px-4 py-3 outline-none focus:border-[#5B1E9A]" 
          />
          <button disabled={loading} className="w-full bg-[#5B1E9A] text-white py-3 rounded-xl font-semibold hover:bg-[#4A177F] disabled:opacity-50">
            {loading ? "Verifying..." : "Secure Login"}
          </button>
        </form>
      </div>
    </div>
  )
}