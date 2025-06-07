import React, { useState } from "react";

export default function StepFive({ keyword = "ds", onNext }) {
  const [selectedOption, setSelectedOption] = useState("own");

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

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
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

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 8 }}>
            {[1, 2, 3, 4].map((num) => (
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
          </div>

          <button
            onClick={() => onNext(selectedOption)}
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
            Next{" "}
            <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>
              🔄
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

