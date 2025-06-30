import React, { useEffect } from "react";
import "./css/StepKeywordInput.css";

const StepKeywordInput = ({ keyword, setKeyword, language, setLanguage, onNext }) => {
  // Load từ localStorage nếu có
  useEffect(() => {
    const savedData = localStorage.getItem("ai_writer_data");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed.main_keyword) setKeyword(parsed.main_keyword);
      if (parsed.language) setLanguage(parsed.language);
    }
  }, []);

  // Lưu vào localStorage mỗi khi keyword hoặc language thay đổi
  useEffect(() => {
    const saved = localStorage.getItem("ai_writer_data");
    const parsed = saved ? JSON.parse(saved) : {};
    parsed.main_keyword = keyword;
    parsed.language = language;
    localStorage.setItem("ai_writer_data", JSON.stringify(parsed));
  }, [keyword, language]);

  return (
    <div className="step-container">
      <div className="step-box">
        <h1 className="step-title">Viết thông minh</h1>

        <div className="step-label">Bước 1:</div>
        <div className="step-description">Nhập 1 từ khóa chính của bài viết</div>

        <label htmlFor="keywordInput" className="step-input-label">
          Nhập từ khóa hoặc chủ đề bài viết
        </label>
        <input
          id="keywordInput"
          type="text"
          placeholder="Nhập từ khóa hoặc chủ đề bài viết"
          className="step-input"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={(e) => e.target.classList.add("input-focus")}
          onBlur={(e) => e.target.classList.remove("input-focus")}
        />

        <p className="step-helper">
          Trong trường hợp bạn chưa xác định từ khóa chính, sử dụng ngay công cụ{" "}
          <a href="#" className="step-link">Keyword Suggestion</a>
        </p>

        <label htmlFor="languageSelect" className="step-input-label">
          Ngôn ngữ của bài viết
        </label>
        <select
          id="languageSelect"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="step-select"
          onFocus={(e) => e.target.classList.add("input-focus")}
          onBlur={(e) => e.target.classList.remove("input-focus")}
        >
          <option value="Vietnamese">Vietnamese</option>
          <option value="English">English</option>
        </select>

        <button
          onClick={onNext}
          className="step-button"
          onMouseEnter={(e) => e.target.classList.add("hover")}
          onMouseLeave={(e) => e.target.classList.remove("hover")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepKeywordInput;
