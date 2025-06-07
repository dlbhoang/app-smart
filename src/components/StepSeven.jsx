import React, { useState } from "react";

const StepSeven = ({ keyword, onWritePost }) => {
  const [aiModel, setAiModel] = useState("ChatGPT 4.1 MINI: AI viết 1 lần = 1 post 🔥🧠");
  const [selectedWebsite, setSelectedWebsite] = useState("");
  const [keywordLinks, setKeywordLinks] = useState("");
  const [finalParagraph, setFinalParagraph] = useState("");
  const [boldMainKeyword, setBoldMainKeyword] = useState(false);
  const [boldHeadings, setBoldHeadings] = useState(false);
  const [position, setPosition] = useState(null);

  const handleWritePost = () => {
    onWritePost({
      aiModel,
      selectedWebsite,
      keywordLinks,
      finalParagraph,
      boldMainKeyword,
      boldHeadings,
      position,
    });
  };

  const labelStyle = {
    fontWeight: 600,
    marginBottom: 8,
    display: "block",
    color: "#000",
  };

  const inputStyle = {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    color: "#000",
    fontSize: 14,
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        width: "100vw",
        padding: 32,
        fontFamily: "Arial, sans-serif",
        background: "#f9fafb",
        minHeight: "100vh",
        boxSizing: "border-box",
        color: "#000",
      }}
    >
      <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
        <strong>Từ khoá:</strong>{" "}
        <span style={{ color: "#2563eb" }}>{keyword}</span>
      </p>

      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: "#000" }}>
        <span style={{ color: "#2563eb" }}>Bước 6:</span> Cấu hình và viết bài bằng AI
      </h2>

      {/* Chọn Model AI */}
    <div style={{ marginBottom: 20 }}>
  <label style={labelStyle}>Chọn công cụ AI</label>
  <div
    style={{
      position: "relative",
      width: "100%",
      maxWidth: 400,
      borderRadius: 8,
      border: "1.5px solid #2563eb",
      backgroundColor: "#fff",
      color: "#111827",
      fontWeight: 600,
      fontSize: 15,
      cursor: "pointer",
      boxShadow: "0 2px 8px rgb(37 99 235 / 0.15)",
      transition: "border-color 0.3s ease",
    }}
  >
    <select
      value={aiModel}
      onChange={(e) => setAiModel(e.target.value)}
      style={{
        width: "100%",
        padding: "12px 40px 12px 16px",
        border: "none",
        outline: "none",
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
        backgroundColor: "transparent",
        color: "#111827",
        fontWeight: 600,
        fontSize: 15,
        cursor: "pointer",
      }}
    >
      <option>ChatGPT 4.1 MINI: AI viết 1 lần = 1 post 🔥🧠</option>
      <option>ChatGPT 4.5 Turbo: Viết dài, chi tiết hơn 🧠</option>
      <option>Claude 3 Opus: Tự nhiên như người thật ✨</option>
    </select>
    {/* Mũi tên dropdown custom */}
    <svg
      style={{
        position: "absolute",
        right: 12,
        top: "50%",
        pointerEvents: "none",
        transform: "translateY(-50%)",
        width: 20,
        height: 20,
        fill: "#2563eb",
      }}
      viewBox="0 0 24 24"
    >
      <path d="M7 10l5 5 5-5H7z" />
    </svg>
  </div>
</div>
    <div style={{ marginBottom: 20 }}>
  <label style={labelStyle}>Chọn trang web để đăng (Tùy chọn)</label>
  <div
    style={{
      position: "relative",
      width: "100%",
      maxWidth: 400,
      borderRadius: 8,
      border: "1.5px solid #2563eb",
      backgroundColor: "#fff",
      color: selectedWebsite ? "#111827" : "#6b7280", // màu chữ placeholder mờ hơn
      fontWeight: 600,
      fontSize: 15,
      cursor: "pointer",
      boxShadow: "0 2px 8px rgb(37 99 235 / 0.15)",
      transition: "border-color 0.3s ease",
    }}
  >
    <select
      value={selectedWebsite}
      onChange={(e) => setSelectedWebsite(e.target.value)}
      style={{
        width: "100%",
        padding: "12px 40px 12px 16px",
        border: "none",
        outline: "none",
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
        backgroundColor: "transparent",
        color: selectedWebsite ? "#111827" : "#6b7280",
        fontWeight: 600,
        fontSize: 15,
        cursor: "pointer",
      }}
    >
      <option value="" disabled>
        -- Chọn website để đăng --
      </option>
      <option value="myblog.com">myblog.com</option>
      <option value="webmoi.vn">webmoi.vn</option>
    </select>

    {/* Icon mũi tên dropdown */}
    <svg
      style={{
        position: "absolute",
        right: 12,
        top: "50%",
        pointerEvents: "none",
        transform: "translateY(-50%)",
        width: 20,
        height: 20,
        fill: "#2563eb",
      }}
      viewBox="0 0 24 24"
    >
      <path d="M7 10l5 5 5-5H7z" />
    </svg>
  </div>
</div>

      {/* Liên kết từ khoá */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Thêm liên kết nếu nội dung có chứa các từ khoá sau</label>
        <textarea
          rows={4}
          value={keywordLinks}
          onChange={(e) => setKeywordLinks(e.target.value)}
          placeholder="Ví dụ:\nTừKhoá_1|https://link1.com\nTừKhoá_2|https://link2.com"
          style={{ ...inputStyle, fontFamily: "monospace" }}
        />
      </div>

      {/* Đoạn kết */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Thêm đoạn kết (xuất hiện cuối bài viết)</label>
        <textarea
          rows={3}
          value={finalParagraph}
          onChange={(e) => setFinalParagraph(e.target.value)}
          placeholder="Ví dụ: Cảm ơn bạn đã đọc bài viết!..."
          style={inputStyle}
        />
      </div>

      {/* Tùy chọn in đậm */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Tùy chọn in đậm nội dung</label>
        <label style={{ color: "#000", marginRight: 24, display: "inline-block" }}>
          <input
            type="checkbox"
            checked={boldMainKeyword}
            onChange={() => setBoldMainKeyword((prev) => !prev)}
            style={{ marginRight: 6 }}
          />
          In đậm từ khoá chính
        </label>
        <label style={{ color: "#000", display: "inline-block" }}>
          <input
            type="checkbox"
            checked={boldHeadings}
            onChange={() => setBoldHeadings((prev) => !prev)}
            style={{ marginRight: 6 }}
          />
          In đậm tiêu đề (h2, h3)
        </label>
      </div>

      {/* Vị trí chèn từ khoá */}
      <div style={{ marginBottom: 30 }}>
        <label style={labelStyle}>Vị trí chèn từ khoá in đậm (tuỳ chọn)</label>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <button
            key={n}
            onClick={() => setPosition(n)}
            style={{
              padding: "10px 16px",
              marginRight: 8,
              backgroundColor: position === n ? "#2563eb" : "#e5e7eb",
              color: position === n ? "#fff" : "#111827",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              marginBottom: 8,
            }}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Nút viết bài */}
      <button
        onClick={handleWritePost}
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          fontWeight: "bold",
          padding: "14px 28px",
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
          fontSize: 16,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        ✍️ Bắt đầu viết bài
      </button>
    </div>
  );
};

export default StepSeven;
