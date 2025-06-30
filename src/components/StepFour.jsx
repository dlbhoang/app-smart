import React, { useState, useEffect } from "react";

const StepFour = ({ keyword = "trí tuệ nhân tạo", onNext }) => {
  const [selectedModel, setSelectedModel] = useState("chatgpt");
  const [titles, setTitles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const perPage = 3;

  useEffect(() => {
    const saved = localStorage.getItem("ai_writer_data");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.title) {
        setSelectedTitle(parsed.title);
      }
    }
  }, []);

  useEffect(() => {
    console.log("📦 LocalStorage:", localStorage.getItem("ai_writer_data"));
  }, [selectedTitle]);

  const generateTitles = async () => {
    setLoading(true);
    setTitles([]);
    setSelectedTitle(null);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://server-hxhc.onrender.com/api/ai-writer/generate-titles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          keyword,
          ai_model: selectedModel,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.titles) {
        alert("❌ Lỗi: " + (result.message || result.error || "Không thể tạo tiêu đề."));
        return;
      }

      setTitles(result.titles);
      setPage(1);
    } catch (error) {
      console.error("❌ Lỗi khi gọi API:", error);
      alert("Đã xảy ra lỗi khi gọi API.");
    } finally {
      setLoading(false);
    }
  };

  const titlesToShow = titles.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(titles.length / perPage);

  const handleNext = () => {
    if (selectedTitle) {
      const saved = localStorage.getItem("ai_writer_data");
      const parsed = saved ? JSON.parse(saved) : {};
      const updated = {
        ...parsed,
        title: selectedTitle,
        ai_model: selectedModel,
      };
      localStorage.setItem("ai_writer_data", JSON.stringify(updated));
      onNext(selectedTitle);
    }
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
        <h2
          style={{
            fontSize: 22,
            fontWeight: "800",
            color: "#111827",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Bước 4: Tạo tiêu đề bài viết
        </h2>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 8, color: "#374151" }}>
            Từ khóa:
          </label>
          <input
            type="text"
            value={keyword}
            disabled
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #d1d5db",
              fontSize: 16,
              backgroundColor: "#f3f4f6",
            }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 8, color: "#374151" }}>
            Chọn mô hình AI:
          </label>
          <div style={{ display: "flex", gap: 16 }}>
            {["gemini", "chatgpt"].map((model) => (
              <label
                key={model}
                style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
              >
                <input
                  type="radio"
                  value={model}
                  checked={selectedModel === model}
                  onChange={() => setSelectedModel(model)}
                  style={{ width: 18, height: 18 }}
                />
                <span style={{ fontWeight: "500", color: "#374151" }}>{model.toUpperCase()}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={generateTitles}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 24,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "all 0.3s ease",
          }}
        >
          {loading ? "Đang tạo tiêu đề..." : "Tạo tiêu đề"}
        </button>

        {titlesToShow.length > 0 && (
          <>
            <div style={{ display: "grid", gap: 16, marginBottom: 24 }}>
              {titlesToShow.map((title, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedTitle(title)}
                  style={{
                    padding: 16,
                    borderRadius: 8,
                    border: selectedTitle === title ? "2px solid #2563eb" : "1px solid #d1d5db",
                    backgroundColor: selectedTitle === title ? "#e0f2fe" : "white",
                    cursor: "pointer",
                    fontWeight: "500",
                    color: "#374151",
                    transition: "all 0.2s ease",
                  }}
                >
                  {title}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 24 }}>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: page === i + 1 ? "#2563eb" : "#e5e7eb",
                    color: page === i + 1 ? "white" : "#374151",
                    fontWeight: "700",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 16,
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}

        {selectedTitle && (
          <div style={{ textAlign: "center" }}>
            <p style={{ marginBottom: 16, color: "#16a34a", fontWeight: "600" }}>
              Tiêu đề đã chọn: <span style={{ fontWeight: "700" }}>{selectedTitle}</span>
            </p>
            <button
              onClick={handleNext}
              style={{
                padding: "12px 24px",
                backgroundColor: "#16a34a",
                color: "white",
                fontSize: 16,
                borderRadius: 8,
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
              }}
            >
              Tiếp tục
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepFour;
