import React from "react";
import "./css/faq.css"; // 👈 import CSS

const FAQFooter = () => {
  const faqs = [
    "Thời hạn và giá của mỗi gói dịch vụ",
    "Số bài viết/tháng và số từ/tháng là gì?",
    "Gói lifetime là gì?",
    "Giới hạn từ và bài viết của gói lifetime?",
    "Khi nào thì số bài viết và số từ được reset lại?",
    "Trường hợp hủy gói lifetime bất khả kháng?",
  ];

  return (
    <div className="faq-container">
      <main className="faq-main">
        <p className="faq-label">FAQs</p>
        <h2 className="faq-title">Các câu hỏi thường gặp</h2>
        <p className="faq-description">
          Dưới đây là một số loại câu hỏi cơ bản dành cho khách hàng
        </p>

        <section className="faq-section">
          {faqs.map((q, index) => (
            <details key={index} className="faq-item">
              <summary className="faq-summary">
                <i className="fas fa-play faq-icon"></i> {q}
              </summary>
            </details>
          ))}
        </section>

        <p className="faq-footer">
          Vẫn còn câu hỏi chưa được trả lời?{" "}
          <a href="#">Liên hệ chúng tôi</a>
        </p>
      </main>
    </div>
  );
};

export default FAQFooter;
