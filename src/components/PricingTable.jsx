import React from "react";
import "./css/Pricing.css";

const pricingData = {
  plans: [
    {
      name: "Free",
      price: "$0/tháng",
      vnd: "(0,0 vnd)",
      credits: "5,000",
      posts: "0",
      keywordTools: "✔️",
      seoTools: "",
    },
    {
      name: "Starter",
      price: "$9/tháng",
      vnd: "(225,000 vnd)",
      credits: "180,000",
      posts: "60",
      keywordTools: "Unlimited",
      seoTools: "✔️",
    },
    {
      name: "Grow",
      price: "$19/tháng",
      vnd: "(475,000 vnd)",
      credits: "450,000",
      posts: "150",
      keywordTools: "Unlimited",
      seoTools: "✔️",
    },
    {
      name: "Pro",
      price: "$29/tháng",
      vnd: "(725,000 vnd)",
      credits: "900,000",
      posts: "300",
      keywordTools: "Unlimited",
      seoTools: "✔️",
    },
    {
      name: "Corp",
      price: "$49/tháng",
      vnd: "(1,225,000 vnd)",
      credits: "1,800,000",
      posts: "600",
      keywordTools: "Unlimited",
      seoTools: "✔️",
    },
  ],
  features: [
    "Hỗ trợ 100+ ngôn ngữ",
    "Viết bài bằng AI",
    "Viết lại bằng AI",
    "Tối ưu bài cũ bằng AI",
    "AI Editor",
    "AI Search",
    "Không giới hạn đăng bài",
    "Không giới hạn Websites",
    "Thêm hình ảnh bài viết",
    "Thêm video Youtube",
    "AI Chấm điểm SEO",
    "Auto-Indexing (Google + Bing)",
    "AI Detector",
    "Bypass AI",
    "Unlimited Team Members",
  ],
};

const Pricing = () => {
  return (
    <div className="pricing-table">
      <div className="table-header">
        <div className="feature-title"></div>
        {pricingData.plans.map((plan, index) => (
          <div key={index} className="plan-header">
            <div className="plan-name">{plan.name}</div>
            <div className="plan-price">{plan.price}</div>
            <div className="plan-vnd">{plan.vnd}</div>
          </div>
        ))}
      </div>

      <div className="table-row">
        <div className="feature-title">Credits/Tháng</div>
        {pricingData.plans.map((plan, index) => (
          <div key={index}>{plan.credits}</div>
        ))}
      </div>

      <div className="table-row">
        <div className="feature-title">Bài viết/tháng</div>
        {pricingData.plans.map((plan, index) => (
          <div key={index}>{plan.posts}</div>
        ))}
      </div>

      <div className="table-row">
        <div className="feature-title">Keyword Tools</div>
        {pricingData.plans.map((plan, index) => (
          <div key={index}>{plan.keywordTools}</div>
        ))}
      </div>

      <div className="table-row">
        <div className="feature-title">SEO Tools + 30 tools</div>
        {pricingData.plans.map((plan, index) => (
          <div key={index}>
            {plan.seoTools ? "miễn phí (giới hạn theo số từ)" : ""}
          </div>
        ))}
      </div>

      {pricingData.features.map((feature, rowIndex) => (
        <div className="table-row" key={rowIndex}>
          <div className="feature-title">{feature}</div>
          {pricingData.plans.map((_, colIndex) => (
            <div key={colIndex}>✔️</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Pricing;
