import React from "react";
import Pricing from "../components/PricingTable";
import FAQFooter from "../components/FAQFooter"; // ← đường dẫn chính xác
import PricingHeader from "../components/PricingHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PricingPage = () => {
  return (
    <div className="pricing-page-wrapper">
      <Header />
      <PricingHeader />
      <Pricing />
      <FAQFooter />
      <Footer/>
    </div>

  );
};

export default PricingPage;
