import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import html2pdf from "html2pdf.js";
import "./css/ArticleResult.css";

const ArticleResult = () => {
  const location = useLocation();
  const article = location.state?.article;
  const loading = location.state?.loading;
  const keyword = location.state?.keyword;

  const [displayedText, setDisplayedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!article?.content) return;

    const cleanedHTML = article.content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/#/g, "")
      .split(/\n{2,}/)
      .map((para) => `<p>${para.trim()}</p>`)
      .join("");

    let index = 0;
    const speed = 5;

    const interval = setInterval(() => {
      if (index >= cleanedHTML.length) {
        clearInterval(interval);
        setTypingDone(true);
        setEditedContent(cleanedHTML);
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

  const wrapSelection = (tag) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const before = editedContent.substring(0, start);
    const selected = editedContent.substring(start, end);
    const after = editedContent.substring(end);

    let wrapped = selected;

    if (tag === "strong") {
      wrapped = `<strong>${selected}</strong>`;
    } else if (tag === "em") {
      wrapped = `<em>${selected}</em>`;
    }

    const newText = before + wrapped + after;
    setEditedContent(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + wrapped.length;
    }, 0);
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById("article-content");

    const opt = {
      margin: 0.5,
      filename: `${article.title || "article"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

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
        id="article-content"
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

        <p style={{ textAlign: "center", fontStyle: "italic", fontSize: "15px", marginBottom: 20 }}>
          {typingDone ? `Tổng số từ: ${wordCount}` : `Đã hiển thị: ${wordCount} từ...`}
        </p>

        {!isEditing ? (
          <div className="article-body" dangerouslySetInnerHTML={{ __html: displayedText }} />
        ) : (
          <>
            <div style={{ marginBottom: "10px" }}>
              <button
                onClick={() => wrapSelection("strong")}
                style={{
                  marginRight: "8px",
                  padding: "6px 12px",
                  fontWeight: "bold",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "#f0f0f0",
                  cursor: "pointer",
                }}
              >
                B
              </button>
              <button
                onClick={() => wrapSelection("em")}
                style={{
                  padding: "6px 12px",
                  fontStyle: "italic",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "#f0f0f0",
                  cursor: "pointer",
                }}
              >
                I
              </button>
            </div>

            <textarea
              ref={textareaRef}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              style={{
                width: "100%",
                height: "400px",
                fontSize: "16px",
                fontFamily: "inherit",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                resize: "vertical",
              }}
            />
          </>
        )}

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
              <span>✅ Đã hiển thị toàn bộ nội dung</span>
              <div>
                {!isEditing ? (
                  <>
                   
                    <button
                      onClick={handleDownloadPDF}
                      style={{
                        marginLeft: "12px",
                        padding: "8px 16px",
                        borderRadius: "6px",
                        backgroundColor: "#f59e0b",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      📄 Tải PDF
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setDisplayedText(editedContent);
                    }}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "6px",
                      backgroundColor: "#10b981",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    💾 Lưu nội dung
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ArticleResult;
