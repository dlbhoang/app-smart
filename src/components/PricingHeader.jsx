import React from "react";
import "./css/pricing-header.css";

const PricingHeader = () => {
  return (
    <section className="pricing-header">
      <h2>
        Bảng Giá
        <img
          alt="Mũi tên màu đỏ chỉ vào chữ Bảng Giá"
          src="https://storage.googleapis.com/a1aa/image/698d4d7d-27e5-411d-360f-9b22bd89e7ab.jpg"
          width={40}
          height={20}
        />
      </h2>
      <div className="info">
        <label>
          <input type="checkbox" disabled />
          <span>Theo năm</span>
          <span>giảm 30%</span>
        </label>
        <span className="hot-badge">Hot</span>
        <p>
          Hàng tháng, nếu bạn không sử dụng quá nhiều,{" "}
          <a href="#">đăng ký gói lifetime</a>
        </p>
      </div>
    </section>
  );
};

export default PricingHeader;
