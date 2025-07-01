import React, { useState, useEffect } from "react";
import "./css/KeywordStep2.css";

const KeywordStep2 = ({ mainKeyword = "", onNextStep }) => {
  const [keywordOption, setKeywordOption] = useState("");
  const [manualKeywords, setManualKeywords] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("ai_writer_data");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.sub_keyword_mode) setKeywordOption(parsed.sub_keyword_mode);
      if (parsed.manual_keywords) setManualKeywords(parsed.manual_keywords);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("ai_writer_data");
    const parsed = saved ? JSON.parse(saved) : {};
    parsed.sub_keyword_mode = keywordOption;
    localStorage.setItem("ai_writer_data", JSON.stringify(parsed));
  }, [keywordOption]);

  useEffect(() => {
    const saved = localStorage.getItem("ai_writer_data");
    const parsed = saved ? JSON.parse(saved) : {};
    parsed.manual_keywords = manualKeywords;
    localStorage.setItem("ai_writer_data", JSON.stringify(parsed));
  }, [manualKeywords]);

  const handleOptionChange = (e) => {
    setKeywordOption(e.target.value);
    setError("");
  };

  const handleNext = () => {
    if (!keywordOption) return;

    if (keywordOption === "manual") {
      const keywords = manualKeywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k !== "");

      if (keywords.length === 0) {
        setError("Vui lòng nhập ít nhất 1 từ khóa phụ.");
        return;
      }
      if (keywords.length > 4) {
        setError("Chỉ được nhập tối đa 4 từ khóa phụ.");
        return;
      }
    }

    onNextStep(keywordOption);
  };

  return (
    <div className="step-container">
      <div className="step-box">
        <h1 className="step-title">
          Từ khóa: <span className="highlight">{mainKeyword}</span>
        </h1>

        <div className="step-label">Bước 2:</div>
        <div className="step-description">
          Thêm 2 - 4 từ khóa phụ vào bài viết
        </div>

        <h3 className="step-subheading">Chọn phương án thêm từ khóa phụ</h3>

        <div className="step-options">
          <label className="step-option">
            <input
              type="radio"
              name="keywordOption"
              value="none"
              checked={keywordOption === "none"}
              onChange={handleOptionChange}
            />
            <span>Không cần từ khóa phụ</span>
          </label>

          <label className="step-option">
            <input
              type="radio"
              name="keywordOption"
              value="manual"
              checked={keywordOption === "manual"}
              onChange={handleOptionChange}
            />
            <span>Bạn sẽ nhập từ khóa phụ theo ý bạn</span>
          </label>

          <label className="step-option">
            <input
              type="radio"
              name="keywordOption"
              value="ai"
              checked={keywordOption === "ai"}
              onChange={handleOptionChange}
            />
            <span>
              <strong className="highlight">Sử dụng AI:</strong> Nhận đề xuất từ
              Google, sau đó bạn sẽ hiệu chỉnh lại
            </span>
          </label>
        </div>

        {keywordOption === "manual" && (
          <div className="manual-keywords-box improved">
            <label htmlFor="manualKeywords" className="step-subheading">
              Nhập từ khóa phụ (tối đa 4, cách nhau bằng dấu phẩy):
            </label>
            <div className="tag-input-wrapper">
              <input
                type="text"
                className="tag-input"
                value={manualKeywords}
                placeholder="Ví dụ: học SEO, viết blog, nghiên cứu từ khóa..."
                onChange={(e) => {
                  setManualKeywords(e.target.value);
                  setError("");
                }}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="preview-tags">
              {manualKeywords
                .split(",")
                .map((k) => k.trim())
                .filter((k) => k !== "")
                .map((kw, index) => (
                  <span key={index} className="tag-preview">
                    {kw}
                  </span>
                ))}
            </div>
          </div>
        )}

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
