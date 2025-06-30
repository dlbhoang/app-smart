import React, { useState, useEffect } from "react";
import "./css/KeywordStep2.css";

const KeywordStep2 = ({ mainKeyword = "", onNextStep }) => {
  const [keywordOption, setKeywordOption] = useState("");

  // ✅ Load từ localStorage khi component mount
useEffect(() => {
  const saved = localStorage.getItem("ai_writer_data");
  if (saved) {
    const parsed = JSON.parse(saved);
    console.log("🧠 localStorage hiện tại:", parsed); // ✅ In ra đây
    if (parsed.sub_keyword_mode) {
      setKeywordOption(parsed.sub_keyword_mode);
    }
  } else {
    console.log("⚠️ Không có dữ liệu trong localStorage!");
  }
}, []);


  // ✅ Lưu vào localStorage mỗi khi keywordOption thay đổi
  useEffect(() => {
    const saved = localStorage.getItem("ai_writer_data");
    const parsed = saved ? JSON.parse(saved) : {};
    parsed.sub_keyword_mode = keywordOption;
    localStorage.setItem("ai_writer_data", JSON.stringify(parsed));
  }, [keywordOption]);

  const handleChange = (e) => {
    setKeywordOption(e.target.value);
  };

  const handleNext = () => {
    if (keywordOption && onNextStep) {
      onNextStep(keywordOption);
    }
  };

  return (
    <div className="step-container">
      <div className="step-box">
        <h1 className="step-title">
          Từ khóa: <span className="highlight">{mainKeyword}</span>
        </h1>

        <div className="step-label">Bước 2:</div>
        <div className="step-description">Thêm 2 - 4 từ khóa phụ vào bài viết</div>

        <h3 className="step-subheading">Chọn phương án thêm từ khóa phụ</h3>

        <div className="step-options">
          <label className="step-option">
            <input
              type="radio"
              name="keywordOption"
              value="none"
              checked={keywordOption === "none"}
              onChange={handleChange}
            />
            <span>Không cần từ khóa phụ</span>
          </label>

          <label className="step-option">
            <input
              type="radio"
              name="keywordOption"
              value="manual"
              checked={keywordOption === "manual"}
              onChange={handleChange}
            />
            <span>Bạn sẽ nhập từ khóa phụ theo ý bạn</span>
          </label>

          <label className="step-option">
            <input
              type="radio"
              name="keywordOption"
              value="ai"
              checked={keywordOption === "ai"}
              onChange={handleChange}
            />
            <span>
              <strong className="highlight">Sử dụng AI:</strong> Nhận đề xuất từ Google, sau đó bạn sẽ hiệu chỉnh lại
            </span>
          </label>
        </div>

        <div className="step-buttons">
          <button className="step-button disabled">1</button>
          <button
            className={`step-button ${keywordOption ? "active" : "disabled"}`}
            onClick={handleNext}
            disabled={!keywordOption}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeywordStep2;
