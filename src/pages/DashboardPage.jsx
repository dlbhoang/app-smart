import React from "react";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard.jsx";
import Footer from "../components/Footer.jsx";
const DashboardPage = () => {
  return (
    <div className="bg-white text-gray-800">
      <Header/>
      <Dashboard />
      <Footer/>
    </div>
  );
};

export default DashboardPage;
