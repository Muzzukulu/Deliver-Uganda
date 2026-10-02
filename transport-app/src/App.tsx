import { BrowserRouter, Routes, Route } from "react-router-dom";
import TransporterDashboard from "./pages/TransporterDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TransporterDashboard />} />
        <Route path="/:trackerId" element={<TransporterDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}