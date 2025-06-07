import React from "react";

const StepKeywordInput = ({ keyword, setKeyword, language, setLanguage, onNext }) => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9fafb",
        padding: 20,
        boxSizing: "border-box",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div style={{ maxWidth: 600, width: "100%", backgroundColor: "white", padding: 30, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <h1 style={{ textAlign: "center", marginBottom: 30, color: "#111827" }}>Viết thông minh</h1>

        <div style={{ fontWeight: "700", fontSize: 18, marginBottom: 10, color: "#374151" }}>Bước 1:</div>
        <div style={{ fontSize: 16, marginBottom: 20, color: "#4b5563" }}>Nhập 1 từ khóa chính của bài viết</div>

        <label htmlFor="keywordInput" style={{ display: "block", marginBottom: 8, fontWeight: "600", color: "#374151" }}>
          Nhập từ khóa hoặc chủ đề bài viết
        </label>
        <input
          id="keywordInput"
          type="text"
          placeholder="Nhập từ khóa hoặc chủ đề bài viết"
          style={{
            width: "100%",
            padding: "14px 16px",
            marginBottom: 16,
            boxSizing: "border-box",
            borderRadius: 10,
            border: "2px solid #d1d5db",
            fontSize: 17,
            fontWeight: "600",
            color: "#111827",
            backgroundColor: "#fff",
            opacity: 1,
            caretColor: "#2563eb",
            outline: "none",
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          }}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={(e) => {
            e.target.style.borderColor = "#2563eb";
            e.target.style.boxShadow = "0 0 8px 2px rgba(37, 99, 235, 0.4)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#d1d5db";
            e.target.style.boxShadow = "none";
          }}
        />

        <p style={{ marginBottom: 25, fontSize: 14, color: "#6b7280" }}>
          Trong trường hợp bạn chưa xác định từ khóa chính, sử dụng ngay công cụ{" "}
          <a href="#" style={{ color: "#3b82f6", textDecoration: "underline" }}>
            Keyword Suggestion
          </a>
        </p>

        <label htmlFor="languageSelect" style={{ display: "block", marginBottom: 8, fontWeight: "600", color: "#374151" }}>
          Ngôn ngữ của bài viết
        </label>
        <select
          id="languageSelect"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 14px",
            fontSize: 16,
            borderRadius: 8,
            border: "1.5px solid #d1d5db",
            boxSizing: "border-box",
            fontWeight: "500",
            color: "#222",
            backgroundColor: "#fff",
            cursor: "pointer",
            outline: "none",
            transition: "border-color 0.3s ease",
            appearance: "none",
            MozAppearance: "none",
            WebkitAppearance: "none",
            backgroundImage:
              "url(\"data:image/svg+xml;charset=US-ASCII,%3csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7'%3e%3cpath fill='%233b82f6' d='M0 0l5 7 5-7z'/%3e%3c/svg%3e\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 14px center",
            backgroundSize: "10px 7px",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
          onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
        >
          <option value="Vietnamese">Vietnamese</option>
          <option value="English">English</option>
        </select>

        <button
          onClick={onNext}
          style={{
            marginTop: 35,
            width: "100%",
            padding: "14px",
            backgroundColor: "#3b82f6",
            color: "white",
            fontSize: 16,
            fontWeight: "700",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(59, 130, 246, 0.3)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#2563eb")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#3b82f6")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepKeywordInput;
