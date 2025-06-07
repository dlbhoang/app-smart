import React from "react";
import Pricing from "../components/PricingTable";
import "./css/PricingPage.css";
import FAQFooter from "../components/FAQFooter"; // ← đường dẫn chính xác
import PricingHeader from "../components/PricingHeader";
import Header from "../components/Header";

const PricingPage = () => {
  return (
    <div className="pricing-page-wrapper">
              <Header />

                    <PricingHeader />

      <Pricing />
            <FAQFooter />

    </div>
    
  );
};

export default PricingPage;
