import LiveChat from './components/LiveChat'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Packages from "./pages/Packages.jsx";
import Checkout from "./pages/Checkout.jsx";
import Register from "./pages/Register.jsx";
import Orders from "./pages/Orders.jsx";
import AdminChat from './pages/AdminChat'
import Track from './pages/Track' // ✅ NEW

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/driver/register" element={<Register />} />
        <Route path="/admin" element={<AdminChat />} />
        <Route path="/track/:id" element={<Track />} /> {/* ✅ GPS TRACK */}
        <Route path="/t/:id" element={<Track />} /> {/* ✅ SHORT LINK */}
      </Routes>
      <LiveChat />
    </BrowserRouter>
  );
}