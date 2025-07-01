import React, { useState, useEffect } from "react";

export default function StepFive({ keyword = "ds", onNext }) {
  const [selectedOption, setSelectedOption] = useState("own");
  const [urlInput, setUrlInput] = useState("");
  const [manualInput, setManualInput] = useState("");

  const options = [
    {
      value: "own",
      label: "Của riêng AI",
      description: "Sử dụng dữ liệu của bản thân AI",
    },
    {
      value: "google",
      label: "Từ Google & AI",
      description: "Trước khi viết bài tiến hành tổng hợp dữ liệu từ Google Search",
    },
    {
      value: "url",
      label: "Từ URL & AI",
      description: "Bạn cung cấp 1 link AI sẽ tham khảo dữ liệu từ link này để viết bài",
    },
    {
      value: "input",
      label: "Nhập liệu & AI",
      description: "Bạn sẽ nhập dữ liệu dưới dạng text cho AI",
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("ai_writer_data");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.source_mode) {
        setSelectedOption(parsed.source_mode);
      }
      if (parsed.source_url) {
        setUrlInput(parsed.source_url);
      }
      if (parsed.manual_input) {
        setManualInput(parsed.manual_input);
      }
    }
  }, []);

  const handleNext = () => {
    const saved = localStorage.getItem("ai_writer_data");
    const parsed = saved ? JSON.parse(saved) : {};

    const updated = {
      ...parsed,
      source_mode: selectedOption,
    };

    if (selectedOption === "url" && urlInput.trim() !== "") {
      updated.source_url = urlInput.trim();
    } else {
      delete updated.source_url;
    }

    if (selectedOption === "input" && manualInput.trim() !== "") {
      updated.manual_input = manualInput.trim();
    } else {
      delete updated.manual_input;
    }

    localStorage.setItem("ai_writer_data", JSON.stringify(updated));
    console.log("📦 LocalStorage sau Bước 5:", updated);
    onNext(selectedOption);
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
            Bước 5
          </span>
          Dữ liệu được AI sử dụng trong bài viết
        </h2>

        <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 16 }}>
          Chọn phương án dữ liệu được AI sử dụng khi viết bài
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
          {options.map((option) => (
            <label
              key={option.value}
              style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
            >
              <input
                type="radio"
                value={option.value}
                checked={selectedOption === option.value}
                onChange={() => setSelectedOption(option.value)}
                style={{ width: 18, height: 18 }}
              />
              <div style={{ color: "#374151" }}>
                <span style={{ fontWeight: 600 }}>{option.label}:</span> {option.description}
              </div>
            </label>
          ))}
        </div>

        {/* 👇 Ô nhập URL */}
        {selectedOption === "url" && (
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontWeight: 600, display: "block", marginBottom: 8 }}>
              Nhập đường dẫn URL (bắt đầu bằng http hoặc https)
            </label>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com"
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 8,
                border: "1px solid #ccc",
                fontSize: 15,
              }}
            />
          </div>
        )}

        {/* 👇 Ô nhập liệu text nếu chọn "input" */}
        {selectedOption === "input" && (
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontWeight: 600, display: "block", marginBottom: 8 }}>
              Nhập văn bản để AI sử dụng
            </label>
            <textarea
              rows={6}
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="Ví dụ: Trí tuệ nhân tạo là một lĩnh vực của khoa học máy tính..."
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 8,
                border: "1px solid #ccc",
                fontSize: 15,
                resize: "vertical",
              }}
            />
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 8 }}>
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  backgroundColor: num === 5 ? "#2563eb" : "#f3f4f6",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "600",
                  color: num === 5 ? "white" : "#374151",
                }}
              >
                {num}
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            style={{
              padding: "12px 20px",
              backgroundColor: "#2563eb",
              color: "white",
              fontWeight: "600",
              fontSize: 16,
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Next <span style={{ fontSize: 18 }}>➡️</span>
          </button>
        </div>
      </div>
    </div>
  );
}
