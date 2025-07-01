import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StepSeven = ({ keyword = "trí tuệ nhân tạo", onWritePost }) => {
  const [aiModel, setAiModel] = useState("gpt-4");
  const [selectedWebsite, setSelectedWebsite] = useState("");
  const [keywordLinks, setKeywordLinks] = useState("");
  const [finalParagraph, setFinalParagraph] = useState("");
  const [boldMainKeyword, setBoldMainKeyword] = useState(false);
  const [boldHeadings, setBoldHeadings] = useState(false);
  const [position, setPosition] = useState(null);
  const [wordCount, setWordCount] = useState(1000);
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
          wordCount,
        } = parsed.stepSeven;
        setAiModel(aiModel || "gpt-4");
        setSelectedWebsite(selectedWebsite || "");
        setKeywordLinks(keywordLinks || "");
        setFinalParagraph(finalParagraph || "");
        setBoldMainKeyword(boldMainKeyword || false);
        setBoldHeadings(boldHeadings || false);
        setPosition(position || null);
        setWordCount(wordCount || 1000);
      }
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("ai_writer_data");
    const parsed = saved ? JSON.parse(saved) : {};
    parsed.stepSeven = {
      aiModel,
      selectedWebsite,
      keywordLinks,
      finalParagraph,
      boldMainKeyword,
      boldHeadings,
      position,
      wordCount,
    };
    localStorage.setItem("ai_writer_data", JSON.stringify(parsed));
  }, [
    aiModel,
    selectedWebsite,
    keywordLinks,
    finalParagraph,
    boldMainKeyword,
    boldHeadings,
    position,
    wordCount,
  ]);

  const handleWritePost = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập để sử dụng chức năng viết bài.");
      return;
    }

    const stored = localStorage.getItem("ai_writer_data");
    const parsed = stored ? JSON.parse(stored) : {};
    const stepSeven = parsed.stepSeven || {};

    const body = {
      main_keyword: parsed.stepOne?.keyword || keyword,
      sub_keywords: parsed.stepTwo?.subKeywords || [],
      outline_mode: "auto",
      title_mode: "auto",
      source_mode: "builtin",
      semantic_option: parsed.stepFour?.semanticOption || "skip",
      semantic_keywords: parsed.stepFour?.semanticKeywords || [],
      word_count: stepSeven.wordCount || 1000,
      stepSeven: {
        aiModel: stepSeven.aiModel || "gpt-4",
        boldMainKeyword: stepSeven.boldMainKeyword || false,
        boldHeadings: stepSeven.boldHeadings || false,
        position: stepSeven.position || null,
        keywordLinks: stepSeven.keywordLinks || "",
        finalParagraph: stepSeven.finalParagraph || "",
        selectedWebsite: stepSeven.selectedWebsite || "",
      },
    };

    navigate("/ai-writer/result", {
      state: {
        loading: true,
        keyword,
      },
    });

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://server-hxhc.onrender.com/api/ai-writer/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      const result = await response.json();

      if (!response.ok || result.message !== "Viết bài thành công!") {
        alert("❌ Lỗi: " + (result.message || result.error));
        return;
      }

      navigate("/ai-writer/result", {
        replace: true,
        state: { article: result.article },
      });
    } catch (err) {
      console.error("❌ Lỗi:", err);
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
        <span style={{ color: "#2563eb" }}>Bước 7:</span> Cấu hình và viết bài
        bằng AI
      </h2>

      {/* Chọn Model */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Chọn công cụ AI</label>
        <select
          value={aiModel}
          onChange={(e) => setAiModel(e.target.value)}
          style={inputStyle}
        >
          <option value="gpt-4">
            ChatGPT 4.1 MINI: AI viết 1 lần = 1 post 🔥🧠
          </option>
          <option value="gpt-4.5">
            ChatGPT 4.5 Turbo: Viết dài, chi tiết hơn 🧠
          </option>
          <option value="claude">
            Claude 3 Opus: Tự nhiên như người thật ✨
          </option>
        </select>
      </div>

      {/* Website đăng */}
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

      {/* Số lượng từ */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Số lượng từ mong muốn</label>
        <select
          value={wordCount}
          onChange={(e) => setWordCount(parseInt(e.target.value))}
          style={inputStyle}
        >
          <option value={500}>500 từ</option>
          <option value={1000}>1000 từ</option>
          <option value={1500}>1500 từ</option>
          <option value={2000}>2000 từ</option>
        </select>
        <p style={{ fontSize: 13, color: "#555", marginTop: 8 }}>
          📌 Mỗi 1 từ = 1 credit. Bạn sẽ bị trừ {wordCount} credits.
        </p>
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
