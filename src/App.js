import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";
import PricingPage from "./pages/Pricing";
import SmartWriterPage from "./pages/SmartWritePage";
import NotFound from "./pages/NotFound";
import DisclaimerPage from './pages/DisclaimerPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/smart-writer" element={<SmartWriterPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      </Routes>
    </Router>
  );
};

const navStyle = {
  padding: "20px",
  backgroundColor: "#f3f4f6",
  display: "flex",
  gap: "20px",
  borderBottom: "1px solid #e5e7eb",
};

const linkStyle = {
  textDecoration: "none",
  fontWeight: "500",
  color: "#3b82f6",
};

export default App;
