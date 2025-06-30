import React, { useState, useEffect } from "react";
import "./css/Pricing.css";

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [qrModalVisible, setQrModalVisible] = useState(false);

  useEffect(() => {
    fetch("https://server-hxhc.onrender.com/api/plans")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const sorted = data.sort((a, b) => Number(a.credits) - Number(b.credits));
          setPlans(sorted);
        }
      })
      .catch((err) => console.error("Lỗi khi lấy gói:", err));
  }, []);

  const createOrder = async (plan) => {
    if (plan.name === "Free") return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://server-hxhc.onrender.com/api/orders/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan_id: plan.id }),
      });
      const data = await res.json();

      if (res.ok && data.order) {
        const planWithOrder = { ...plan, orderId: data.order.id };
        openDialog(planWithOrder);
      } else {
        alert("Không thể tạo đơn hàng!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi khi tạo đơn hàng!");
    }
  };

  const openDialog = (plan) => {
    setSelectedPlan(plan);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setSelectedPlan(null);
    setQrModalVisible(false);
  };

  const openQrModal = () => {
    setQrModalVisible(true);
  };

  const handlePaid = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://server-hxhc.onrender.com/api/orders/confirm-payment-request/${selectedPlan.orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("✅ Đã gửi xác nhận thanh toán. Vui lòng chờ admin duyệt!");
        closeDialog();
      } else {
        alert(`❌ Lỗi: ${data.message}`);
      }
    } catch (error) {
      console.error("Lỗi khi xác nhận thanh toán:", error);
      alert("❌ Có lỗi xảy ra khi xác nhận thanh toán!");
    }
  };

  return (
    <div className="pricing-table">
      <div className="table-header">
        <div className="feature-title"></div>
        {plans.map((plan, index) => (
          <div key={index} className="plan-header">
            <div className="plan-name">
              {plan.name}
              {(plan.name === "Pro" || plan.name === "Premium") && (
                <div className="popular-label">🌟 Phổ biến nhất</div>
              )}
            </div>
            <div className="plan-price">{plan.price}</div>
            <div className="plan-vnd">{plan.vnd} VND</div>
            <button
              className="pay-button"
              onClick={() => createOrder(plan)}
              disabled={plan.name === "Free"}
              style={{
                opacity: plan.name === "Free" ? 0.5 : 1,
                cursor: plan.name === "Free" ? "not-allowed" : "pointer",
              }}
            >
              {plan.name === "Free" ? "Miễn phí" : "Thanh toán"}
            </button>
          </div>
        ))}
      </div>

      <div className="table-row">
        <div className="feature-title">Credits/Tháng</div>
        {plans.map((plan, index) => (
          <div key={index}>{plan.credits}</div>
        ))}
      </div>

      <div className="table-row">
        <div className="feature-title">Bài viết/tháng</div>
        {plans.map((plan, index) => (
          <div key={index}>{plan.posts}</div>
        ))}
      </div>

      <div className="table-row">
        <div className="feature-title">Keyword Tools</div>
        {plans.map((plan, index) => (
          <div key={index}>{plan.keywordTools}</div>
        ))}
      </div>

      <div className="table-row">
        <div className="feature-title">SEO Tools</div>
        {plans.map((plan, index) => (
          <div key={index}>{plan.seoTools}</div>
        ))}
      </div>

      {[
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
      ].map((feature, i) => (
        <div className="table-row" key={i}>
          <div className="feature-title">{feature}</div>
          {plans.map((_, idx) => (
            <div key={idx}>✔️</div>
          ))}
        </div>
      ))}

      {/* Dialog thanh toán */}
      {showDialog && selectedPlan && (
        <div className="dialog-overlay">
          <div className="dialog payment-dialog">
            <h3>
              Bạn đang chọn gói <strong>{selectedPlan.name}</strong>
            </h3>
            <p>
              Giá: <strong>{selectedPlan.price}</strong> –{" "}
              <em>{selectedPlan.vnd} VND</em>
            </p>

            <div className="payment-options">
              <div
                className="payment-option"
                onClick={openQrModal}
                style={{ cursor: "pointer" }}
              >
                <img
                  src="https://upanh.vector6.com/images/2020/04/24/025-Logo-PNG-FILE-NganHang-TP-Bank.jpg"
                  alt="TpBank"
                />
                <span>Thanh toán qua chuyển khoản</span>
              </div>
              <div className="payment-option">
                <img
                  src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                  alt="Momo"
                />
                <span>Thanh toán qua MOMO</span>
              </div>
            </div>

            <button onClick={closeDialog} className="close-button">
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* QR Modal */}
      {qrModalVisible && selectedPlan && (
        <div className="dialog-overlay">
          <div className="dialog payment-dialog">
            <h3>Quét mã QR để thanh toán</h3>
            <img
              src={selectedPlan.payUrl}
              alt="QR Thanh toán"
              style={{
                width: "250px",
                height: "250px",
                margin: "20px auto",
                display: "block",
              }}
            />
            <button onClick={handlePaid} className="confirm-button">
              Tôi đã thanh toán
            </button>
            <button onClick={closeDialog} className="close-button">
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;
