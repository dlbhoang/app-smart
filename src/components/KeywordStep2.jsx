import React, { useState } from "react";

const KeywordStep2 = ({ mainKeyword = "", onNextStep }) => {
  const [keywordOption, setKeywordOption] = useState("");

  const handleChange = (e) => {
    setKeywordOption(e.target.value);
  };

  const handleNext = () => {
    if (keywordOption && onNextStep) {
      onNextStep(keywordOption);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9fafb",
        padding: 20,
        boxSizing: "border-box",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 600,
          width: "100%",
          backgroundColor: "white",
          padding: 30,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: "800", color: "#111827", marginBottom: 20 }}>
          Từ khóa: <span style={{ color: "#2563eb" }}>{mainKeyword}</span>
        </h1>

        <div style={{ fontWeight: "700", fontSize: 18, marginBottom: 10, color: "#374151" }}>Bước 2:</div>
        <div style={{ fontSize: 16, marginBottom: 20, color: "#4b5563" }}>
          Thêm 2 - 4 từ khóa phụ vào bài viết
        </div>

        <h3 style={{ fontSize: 16, fontWeight: "600", color: "#374151", marginBottom: 14 }}>
          Chọn phương án thêm từ khóa phụ
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 16, color: "#374151" }}>
          <label style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: 10 }}>
            <input
              type="radio"
              name="keywordOption"
              value="none"
              checked={keywordOption === "none"}
              onChange={handleChange}
              style={{ width: 18, height: 18 }}
            />
            <span>Không cần từ khóa phụ</span>
          </label>

          <label style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: 10 }}>
            <input
              type="radio"
              name="keywordOption"
              value="manual"
              checked={keywordOption === "manual"}
              onChange={handleChange}
              style={{ width: 18, height: 18 }}
            />
            <span>Bạn sẽ nhập từ khóa phụ theo ý bạn</span>
          </label>

          <label style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: 10 }}>
            <input
              type="radio"
              name="keywordOption"
              value="ai"
              checked={keywordOption === "ai"}
              onChange={handleChange}
              style={{ width: 18, height: 18 }}
            />
            <span>
              <strong style={{ color: "#2563eb" }}>Sử dụng AI:</strong> Nhận đề xuất từ Google, sau đó bạn sẽ hiệu chỉnh lại
            </span>
          </label>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 50 }}>
          <button
            disabled
            style={{
              padding: "12px 20px",
              borderRadius: 8,
              backgroundColor: "#e5e7eb",
              color: "#6b7280",
              fontWeight: "700",
              fontSize: 16,
              border: "none",
              cursor: "default",
            }}
          >
            1
          </button>

          <button
            onClick={handleNext}
            disabled={!keywordOption}
            style={{
              padding: "12px 20px",
              borderRadius: 8,
              backgroundColor: keywordOption ? "#bfdbfe" : "#e5e7eb",
              color: keywordOption ? "#2563eb" : "#9ca3af",
              fontWeight: "700",
              fontSize: 16,
              border: "none",
              cursor: keywordOption ? "pointer" : "not-allowed",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (keywordOption) e.target.style.backgroundColor = "#93c5fd";
            }}
            onMouseLeave={(e) => {
              if (keywordOption) e.target.style.backgroundColor = "#bfdbfe";
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeywordStep2;
