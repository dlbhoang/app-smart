import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StepSeven = ({ keyword = "trí tuệ nhân tạo", onWritePost }) => {
  const [aiModel, setAiModel] = useState("ChatGPT 4.1 MINI: AI viết 1 lần = 1 post 🔥🧠");
  const [selectedWebsite, setSelectedWebsite] = useState("");
  const [keywordLinks, setKeywordLinks] = useState("");
  const [finalParagraph, setFinalParagraph] = useState("");
  const [boldMainKeyword, setBoldMainKeyword] = useState(false);
  const [boldHeadings, setBoldHeadings] = useState(false);
  const [position, setPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("ai_writer_data");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.stepSeven) {
        const {
          aiModel,
          selectedWebsite,
          keywordLinks,
          finalParagraph,
          boldMainKeyword,
          boldHeadings,
          position,
        } = parsed.stepSeven;
        setAiModel(aiModel || "");
        setSelectedWebsite(selectedWebsite || "");
        setKeywordLinks(keywordLinks || "");
        setFinalParagraph(finalParagraph || "");
        setBoldMainKeyword(boldMainKeyword || false);
        setBoldHeadings(boldHeadings || false);
        setPosition(position || null);
      }
    }
  }, []);

  const handleWritePost = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập để sử dụng chức năng viết bài.");
      return;
    }

    const stored = localStorage.getItem("ai_writer_data");
    const parsed = stored ? JSON.parse(stored) : {};
    const stepSeven = parsed.stepSeven || {};

    const aiModelMapped =
      stepSeven.aiModel === "Claude 3 Opus: Tự nhiên như người thật ✨"
        ? "claude"
        : (stepSeven.aiModel || "").includes("4.5")
        ? "gpt-4.5"
        : "gpt-4";

    const body = {
      main_keyword: parsed.stepOne?.keyword || keyword,
      sub_keywords: parsed.stepTwo?.subKeywords || [],
      outline_mode: "auto",
      title_mode: "auto",
      source_mode: "builtin",
      semantic_keywords: parsed.stepFour?.semanticKeywords || [],
      ai_model: aiModelMapped,
      bold_keywords: stepSeven.boldMainKeyword || false,
      add_conclusion: !!stepSeven.finalParagraph,
      add_internal_links: !!stepSeven.keywordLinks,
      ...(stepSeven.selectedWebsite && { website: stepSeven.selectedWebsite }), // chỉ thêm nếu có
    };

    console.log("📤 Payload gửi đi:", body);

    try {
      setIsLoading(true);
      const response = await fetch("https://server-hxhc.onrender.com/api/ai-writer/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok || result.message !== "Viết bài thành công!") {
        alert("❌ Lỗi: " + (result.message || result.error));
        return;
      }

      alert("✅ Viết bài thành công!");
      onWritePost?.(result.article);
      navigate("/ai-writer/result", { state: { article: result.article } });
    } catch (error) {
      console.error("❌ Lỗi gửi API:", error);
      alert("Đã xảy ra lỗi khi gửi yêu cầu.");
    } finally {
      setIsLoading(false);
    }
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

      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>
        <span style={{ color: "#2563eb" }}>Bước 7:</span> Cấu hình và viết bài bằng AI
      </h2>

      {/* Chọn Model */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Chọn công cụ AI</label>
        <select value={aiModel} onChange={(e) => setAiModel(e.target.value)} style={inputStyle}>
          <option>ChatGPT 4.1 MINI: AI viết 1 lần = 1 post 🔥🧠</option>
          <option>ChatGPT 4.5 Turbo: Viết dài, chi tiết hơn 🧠</option>
          <option>Claude 3 Opus: Tự nhiên như người thật ✨</option>
        </select>
      </div>

      {/* Website đăng (tuỳ chọn) */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Chọn trang web để đăng (tuỳ chọn)</label>
        <select
          value={selectedWebsite}
          onChange={(e) => setSelectedWebsite(e.target.value)}
          style={inputStyle}
        >
          <option value="">-- Không chọn --</option>
          <option value="myblog.com">myblog.com</option>
          <option value="webmoi.vn">webmoi.vn</option>
        </select>
      </div>

      {/* Liên kết từ khoá */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Liên kết cho từ khoá (Tùy chọn)</label>
        <textarea
          rows={4}
          value={keywordLinks}
          onChange={(e) => setKeywordLinks(e.target.value)}
          placeholder="TừKhoá_1|https://link1.com\nTừKhoá_2|https://link2.com"
          style={{ ...inputStyle, fontFamily: "monospace" }}
        />
      </div>

      {/* Đoạn kết */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Đoạn kết bài viết (tuỳ chọn)</label>
        <textarea
          rows={3}
          value={finalParagraph}
          onChange={(e) => setFinalParagraph(e.target.value)}
          placeholder="Cảm ơn bạn đã đọc bài viết!"
          style={inputStyle}
        />
      </div>

      {/* Tùy chọn in đậm */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Tùy chọn in đậm</label>
        <label style={{ marginRight: 24 }}>
          <input
            type="checkbox"
            checked={boldMainKeyword}
            onChange={() => setBoldMainKeyword(!boldMainKeyword)}
            style={{ marginRight: 6 }}
          />
          In đậm từ khoá chính
        </label>
        <label>
          <input
            type="checkbox"
            checked={boldHeadings}
            onChange={() => setBoldHeadings(!boldHeadings)}
            style={{ marginRight: 6 }}
          />
          In đậm tiêu đề
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

      <button
        onClick={handleWritePost}
        disabled={isLoading}
        style={{
          backgroundColor: isLoading ? "#94a3b8" : "#2563eb",
          color: "white",
          fontWeight: "bold",
          padding: "14px 28px",
          borderRadius: 8,
          border: "none",
          cursor: isLoading ? "not-allowed" : "pointer",
          fontSize: 16,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        {isLoading ? "🧠 Đang viết bài..." : "✍️ Bắt đầu viết bài"}
      </button>
    </div>
  );
};

export default StepSeven;
