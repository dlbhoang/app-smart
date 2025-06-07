import React, { useState, useEffect } from "react";

const StepThree = ({ keyword = "ds", onNextStep }) => {
  const [outlineOption, setOutlineOption] = useState("");
  const [manualOutline, setManualOutline] = useState("");
  const [gptSuggestion, setGptSuggestion] = useState("");

  const handleChange = (e) => {
    setOutlineOption(e.target.value);
  };

  const handleManualChange = (e) => {
    setManualOutline(e.target.value);
  };

  const handleNext = () => {
    if (outlineOption) {
      const result =
        outlineOption === "manual"
          ? { option: "manual", outline: manualOutline }
          : outlineOption === "gpt"
          ? { option: "gpt", outline: gptSuggestion }
          : { option: outlineOption };
      onNextStep?.(result);
    }
  };

  // Tạo gợi ý mẫu nếu chọn GPT
  useEffect(() => {
    if (outlineOption === "gpt") {
      setGptSuggestion(
        `1. Giới thiệu về ${keyword}\n2. Tại sao ${keyword} quan trọng\n3. Ứng dụng thực tế của ${keyword}\n4. Kết luận`
      );
    }
  }, [outlineOption, keyword]);

  const options = [
    { label: "Không cần dàn ý, viết theo từ khóa - Bài viết sẽ dài khoảng 1,000 - 1,500 từ", value: "none" },
    { label: "Bạn sẽ nhập dàn ý theo ý bạn", value: "manual" },
    { label: "Clone Outline: Copy dàn ý (h2, h3) từ 1 website URL", value: "clone" },
    { label: "Sử dụng AI (chatGPT): Công nghệ của OpenAI tạo dàn ý văn phong mượt mà", value: "gpt" },
    { label: "Sử dụng AI (Bard): Công nghệ của Google AI tạo dàn ý hợp với các nội dung mới", value: "bard" },
    { label: "Input & AI: Tùy chọn nâng cao, dùng AI xây dựng dàn ý chi tiết và đúng mục tiêu hơn", value: "input_ai", isPro: true },
  ];

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
          maxWidth: 700,
          width: "100%",
          backgroundColor: "white",
          padding: 30,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ fontSize: 22, fontWeight: "800", color: "#111827", marginBottom: 20 }}>
          Từ khóa: <span style={{ color: "#2563eb" }}>{keyword}</span>
        </h2>

        <div
          style={{
            fontWeight: "700",
            fontSize: 18,
            marginBottom: 10,
            color: "#374151",
          }}
        >
          Bước 3:
        </div>
        <div style={{ fontSize: 16, marginBottom: 20, color: "#4b5563" }}>
          Cung cấp dàn ý (outline) sẽ giúp AI định hình bài viết và viết tốt hơn
        </div>

        <h3 style={{ fontSize: 16, fontWeight: "600", color: "#374151", marginBottom: 14 }}>
          Chọn phương án dàn ý
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 16, color: "#374151" }}>
          {options.map((option) => (
            <label
              key={option.value}
              style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
            >
              <input
                type="radio"
                name="outlineOption"
                value={option.value}
                checked={outlineOption === option.value}
                onChange={handleChange}
                style={{ width: 18, height: 18 }}
              />
              <span>
                {option.value === "input_ai" ? (
                  <>
                    <strong style={{ color: "#2563eb" }}>
                      Input & AI
                      <span
                        style={{
                          backgroundColor: "#fee2e2",
                          color: "#b91c1c",
                          fontSize: 12,
                          padding: "2px 6px",
                          borderRadius: 6,
                          marginLeft: 8,
                        }}
                      >
                        PRO
                      </span>
                    </strong>
                  </>
                ) : (
                  option.label
                )}
              </span>
            </label>
          ))}
        </div>

        {/* Nếu chọn manual thì hiển thị textarea nhập tay */}
        {outlineOption === "manual" && (
          <div style={{ marginTop: 20 }}>
            <label style={{ fontWeight: "600", color: "#374151", display: "block", marginBottom: 8 }}>
              Nhập dàn ý của bạn:
            </label>
            <textarea
              rows={6}
              value={manualOutline}
              onChange={handleManualChange}
              placeholder="Ví dụ:\n1. Giới thiệu\n2. Lợi ích của từ khóa\n3. Cách sử dụng trong thực tế..."
              style={{
                width: "100%",
                padding: 12,
                fontSize: 16,
                borderRadius: 8,
                border: "1px solid #d1d5db",
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
          </div>
        )}

        {outlineOption === "gpt" && (
          <div style={{ marginTop: 20 }}>
            <label style={{ fontWeight: "600", color: "#374151", display: "block", marginBottom: 8 }}>
              Gợi ý dàn ý từ AI:
            </label>
           <textarea
  rows={6}
  value={gptSuggestion}
  onChange={(e) => setGptSuggestion(e.target.value)}
  style={{
    width: "100%",
    padding: 12,
    fontSize: 17,
    fontWeight: "600",
    color: "#000000",
    borderRadius: 8,
    border: "1px solid #d1d5db",
    resize: "vertical",
    fontFamily: "inherit",
    backgroundColor: "#f3f4f6",
  }}
/>
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  backgroundColor: step === 3 ? "#2563eb" : "#e5e7eb",
                  color: step === 3 ? "white" : "#6b7280",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "700",
                  fontSize: 14,
                }}
              >
                {step}
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={
              !outlineOption ||
              (outlineOption === "manual" && manualOutline.trim() === "") ||
              (outlineOption === "gpt" && gptSuggestion.trim() === "")
            }
            style={{
              padding: "12px 20px",
              borderRadius: 8,
              backgroundColor:
                !outlineOption ||
                (outlineOption === "manual" && manualOutline.trim() === "") ||
                (outlineOption === "gpt" && gptSuggestion.trim() === "")
                  ? "#e5e7eb"
                  : "#bfdbfe",
              color:
                !outlineOption ||
                (outlineOption === "manual" && manualOutline.trim() === "") ||
                (outlineOption === "gpt" && gptSuggestion.trim() === "")
                  ? "#9ca3af"
                  : "#2563eb",
              fontWeight: "700",
              fontSize: 16,
              border: "none",
              cursor:
                !outlineOption ||
                (outlineOption === "manual" && manualOutline.trim() === "") ||
                (outlineOption === "gpt" && gptSuggestion.trim() === "")
                  ? "not-allowed"
                  : "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
