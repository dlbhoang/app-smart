import React from "react";
import { useNavigate } from "react-router-dom"; // Thêm dòng này
import "./css/HeroSection.css";

const HeroSection = () => {
  const navigate = useNavigate(); // Khởi tạo navigate

  const handleTryClick = () => {
    navigate("/smart-writer");
  };
   const handlePrice= () => {
    navigate("/pricing");
  };

  return (
    <section className="hero-section">
      <h1>AI viết content chuẩn SEO</h1>
      <p>
        AIContent.com là{" "}
        <span className="highlight">công cụ viết content bằng AI</span> sử dụng
        AI như ChatGPT, Gemini, Claude để tạo bài viết chuẩn SEO, mỗi bài viết
        có 2.000 - 2.500 từ. AI viết content Tiếng Việt đúng ngữ pháp, chính tả,
        nhanh chóng bạn chỉ cần cung cấp{" "}
        <span className="highlight">từ khóa</span> hoặc{" "}
        <span className="highlight">dàn ý</span> là sẽ có bài viết trong 1 phút.
      </p>
      <p className="secondary">
        Tiết kiệm thời gian, tiết kiệm tiền bạc, đạt xếp hạng cao hơn
      </p>

      <div className="btn-group">
        <button className="btn-primary" onClick={handleTryClick}>
          Dùng thử miễn phí!
        </button>
        <button className="btn-secondary" onClick={handlePrice}>Xem biểu phí</button>
      </div>

      <div className="features">
        <div>
          <i className="fas fa-check"></i>
          Dùng thử 7 ngày hoặc 5,000 từ miễn phí
        </div>
        <div>
          <i className="fas fa-check"></i>
          Không cần thẻ tín dụng
        </div>
      </div>

      <iframe
        src="https://www.youtube.com/embed/3q6q6q6q6q6"
        title="AIKTP - Công cụ viết blog bằng AI"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </section>
  );
};

export default HeroSection;
