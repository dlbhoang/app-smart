import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header"; // 👈 Thêm dòng này
import "./css/ArticleResult.css";

const ArticleResult = () => {
  const location = useLocation();
  const article = location.state?.article;

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
      <Header /> {/* 👈 Header ở đầu trang */}
      <div className="article-container">
        <h1 className="article-title">{article.title}</h1>
        <div
  className="article-content"
  dangerouslySetInnerHTML={{
    __html: article.content
      .replace(/#/g, "")         // 👉 Xoá toàn bộ dấu #
      .replace(/\n/g, "<br/>")   // 👉 Chuyển xuống dòng thành <br/>
  }}
/>
        <div className="article-meta">
          <span className="article-date">
            Ngày tạo: {new Date(article.created_at).toLocaleDateString("vi-VN")}
          </span>
          <span className="article-author">
            Tác giả: {article.author || "Không rõ"}
          </span>
        </div>
      </div>
    </>
  );
};

export default ArticleResult;
