import React, { useState, useEffect } from "react";

const StepSix = ({ keyword = "trí tuệ nhân tạo", onNext }) => {
  const [option, setOption] = useState("skip");
  const [semanticKeywords, setSemanticKeywords] = useState([]);
  const [input, setInput] = useState("");

  // Load từ localStorage nếu có
  useEffect(() => {
    const saved = localStorage.getItem("ai_writer_data");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.semantic_option) {
        setOption(parsed.semantic_option);
      }
      if (parsed.semantic_keywords) {
        setSemanticKeywords(parsed.semantic_keywords);
      }
    }
  }, []);

  // Thêm từ khoá vào danh sách khi nhấn Enter
  const handleAddKeyword = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = input.trim();
      if (trimmed && !semanticKeywords.includes(trimmed)) {
        setSemanticKeywords([...semanticKeywords, trimmed]);
      }
      setInput("");
    }
  };

  const removeKeyword = (kw) => {
    setSemanticKeywords(semanticKeywords.filter((k) => k !== kw));
  };

  // Lưu vào localStorage
  const handleNextClick = () => {
    const saved = localStorage.getItem("ai_writer_data");
    const parsed = saved ? JSON.parse(saved) : {};
    const updated = {
      ...parsed,
      semantic_option: option,
      semantic_keywords: semanticKeywords, // ✅ luôn lưu lại
    };
    localStorage.setItem("ai_writer_data", JSON.stringify(updated));
    console.log("📦 LocalStorage sau Bước 6:", updated);
    onNext(option);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f9fafb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 700,
          width: "100%",
          backgroundColor: "white",
          padding: 30,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <p style={{ fontSize: 18, marginBottom: 8 }}>
          <strong>Keyword:</strong>{" "}
          <span style={{ color: "#2563eb", fontWeight: "700" }}>{keyword}</span>
        </p>

        <h2 style={{ fontSize: 22, fontWeight: "800", color: "#111827", marginBottom: 20 }}>
          <span
            style={{
              backgroundColor: "#e0f2fe",
              color: "#2563eb",
              padding: "4px 10px",
              borderRadius: 6,
              fontSize: 14,
              marginRight: 8,
            }}
          >
            Bước 6
          </span>
          Thêm Semantic Keywords, cải thiện chỉ số EEAT
        </h2>

        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
          Để cải thiện EEAT, bạn hãy cung cấp thêm từ khóa ngữ nghĩa cho bài viết này
        </p>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 12 }}>
            <input
              type="radio"
              name="semantic-option"
              value="skip"
              checked={option === "skip"}
              onChange={() => setOption("skip")}
              style={{ marginRight: 8 }}
            />
            <strong>Bỏ qua</strong>: Không cần nhập Semantic Keywords
          </label>

          <label style={{ display: "block" }}>
            <input
              type="radio"
              name="semantic-option"
              value="semantic"
              checked={option === "semantic"}
              onChange={() => setOption("semantic")}
              style={{ marginRight: 8 }}
            />
            <strong style={{ color: "#2563eb" }}>Nhập từ khóa Semantic:</strong>
          </label>
        </div>

        {option === "semantic" && (
          <>
            <input
              type="text"
              placeholder="Nhập từ khóa rồi nhấn Enter..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleAddKeyword}
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: 16,
                border: "1px solid #ccc",
                borderRadius: 8,
                marginBottom: 12,
              }}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {semanticKeywords.map((kw, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "#e0f2fe",
                    padding: "6px 12px",
                    borderRadius: 20,
                    color: "#2563eb",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {kw}
                  <span
                    onClick={() => removeKeyword(kw)}
                    style={{ cursor: "pointer", fontWeight: "bold", marginLeft: 4 }}
                  >
                    ❌
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
          {[1, 2, 3, 4, 5].map((num) => (
            <div
              key={num}
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                backgroundColor: "#f3f4f6",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              {num}
            </div>
          ))}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              backgroundColor: "#2563eb",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "700",
            }}
          >
            6
          </div>
        </div>

        <button
          onClick={handleNextClick}
          style={{
            padding: "12px 20px",
            backgroundColor: "#2563eb",
            color: "white",
            fontWeight: "600",
            fontSize: 16,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Tiếp tục ✨
        </button>
      </div>
    </div>
  );
};

export default StepSix;
