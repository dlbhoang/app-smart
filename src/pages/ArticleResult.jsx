import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import "./css/ArticleResult.css";

const ArticleResult = () => {
  const location = useLocation();
  const article = location.state?.article;
  const loading = location.state?.loading;
  const keyword = location.state?.keyword;

  const [displayedText, setDisplayedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (!article?.content) return;

    const cleanedHTML = article.content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold markdown
      .replace(/#/g, "") // Remove hashtags
      .replace(/<>|<\/>/g, "") // Remove standalone <>
      .split(/\n{2,}/)
      .map((para) => `<p>${para.trim()}</p>`)
      .join("");

    let index = 0;
    const speed = 5;

    const interval = setInterval(() => {
      if (index >= cleanedHTML.length) {
        clearInterval(interval);
        setTypingDone(true);
        return;
      }

      const nextChar = cleanedHTML[index];
      if (nextChar !== undefined) {
        setDisplayedText((prev) => {
          const nextText = prev + nextChar;
          const textWithoutTags = nextText.replace(/<[^>]+>/g, " ");
          const words = textWithoutTags.trim().split(/\s+/).filter(Boolean);
          setWordCount(words.length);
          return nextText;
        });
      }

      index++;
    }, speed);

    return () => clearInterval(interval);
  }, [article]);

  if (loading) {
    return (
      <>
        <Header />
        <div style={{ textAlign: "center", padding: "100px 20px", fontFamily: "'Arial', sans-serif" }}>
          <h2 style={{ fontSize: 24 }}>🧠 Đang tạo bài viết cho từ khoá:</h2>
          <h1 style={{ fontSize: 32, color: "#2563eb", margin: "20px 0" }}>{keyword}</h1>
          <p style={{ fontSize: 16, color: "#555" }}>Vui lòng chờ trong giây lát...</p>
        </div>
      </>
    );
  }

  if (!article) {
    return (
      <>
        <Header />
        <div className="no-data">
          <h2>⚠️ Không có dữ liệu bài viết để hiển thị.</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div
        style={{
          maxWidth: "850px",
          margin: "40px auto",
          padding: "40px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 0 12px rgba(0, 0, 0, 0.1)",
          fontFamily: "'Times New Roman', serif",
          fontSize: "18px",
          lineHeight: "1.8",
          color: "#111",
        }}
      >
        <h1
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "center",
            color: "#2563eb",
          }}
        >
          {article.title?.replace(/^(\d+\.\s)/, "")}
        </h1>

        {/* 👇 Số từ đã hiển thị */}
        <p style={{ textAlign: "center", fontStyle: "italic", fontSize: "15px", marginBottom: 20 }}>
          {typingDone ? `Tổng số từ: ${wordCount}` : `Đã hiển thị: ${wordCount} từ...`}
        </p>

        <div className="article-body" dangerouslySetInnerHTML={{ __html: displayedText }} />

        {typingDone && (
          <>
            <hr style={{ margin: "40px 0", borderTop: "1px solid #ccc" }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontStyle: "italic",
                fontSize: "15px",
                color: "#555",
              }}
            >
              {/* Bạn có thể thêm các thông tin bổ sung ở đây */}
              <span>✅ Đã hiển thị toàn bộ nội dung</span>
              <span>🔄 Cảm ơn bạn đã sử dụng!</span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ArticleResult;
