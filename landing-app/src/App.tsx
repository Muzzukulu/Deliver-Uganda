import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TransporterDashboard from "./pages/TransporterDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/transporter" element={<TransporterDashboard />} />
        <Route path="/transporter/dashboard" element={<TransporterDashboard />} />
        <Route path="/client/dashboard" element={<div>Client Dashboard - Coming Soon</div>} />
        <Route path="/track/:id" element={<div>Tracking Page - Coming Soon</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;