import React, { useState } from "react";

const StepSix = ({ keyword, onNext }) => {
  const [option, setOption] = useState("skip");

  const handleNextClick = () => {
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
            Bước 6
          </span>
          Thêm Semantic Keywords, cải thiện chỉ số EEAT{" "}
          <a href="#" style={{ color: "#2563eb", fontSize: 14, marginLeft: 8 }}>
            (Hướng dẫn)
          </a>
        </h2>

        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
          Để cải thiện EEAT, bạn hãy cung cấp thêm từ khóa ngữ nghĩa cho bài viết này
        </p>

        <div style={{ marginBottom: 32 }}>
          <label style={{ display: "block", marginBottom: 12, color: "#111827", fontSize: 16 }}>
            <input
              type="radio"
              name="semantic-option"
              value="skip"
              checked={option === "skip"}
              onChange={() => setOption("skip")}
              style={{ marginRight: 8 }}
            />
            <strong style={{ color: "#111827" }}>Bỏ qua:</strong> Không cần nhập Semantic Keywords
          </label>

          <label style={{ display: "block", marginBottom: 12, color: "#111827", fontSize: 16 }}>
            <input
              type="radio"
              name="semantic-option"
              value="semantic"
              checked={option === "semantic"}
              onChange={() => setOption("semantic")}
              style={{ marginRight: 8 }}
            />
            <strong style={{ color: "#2563eb" }}>Semantic Keywords:</strong> Khi viết bài, hãy đề cập đến những từ khóa sau
          </label>
        </div>

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
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          Tiếp tục{" "}
          <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>
            ✨
          </span>
        </button>
      </div>
    </div>
  );
};

export default StepSix;
