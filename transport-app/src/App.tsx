import { BrowserRouter, Routes, Route } from "react-router-dom";
import TransporterDashboard from "./pages/TransporterDashboard";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TransporterDashboard />} />
        <Route path="/:trackerId" element={<TransporterDashboard />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}