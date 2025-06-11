import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import "./css/header.css";

const Header = () => {
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { id: "smart-writer", label: "AI WRITER" },
    { id: "rewriter", label: "AI REWRITER" },
    { id: "editor", label: "AI EDITOR" },
    { id: "chat", label: "AI CHAT" },
    { id: "detector", label: "AI DETECTOR" },
    { id: "optimize", label: "AI OPTIMIZE" },
    { id: "tts", label: "AI TTS" },
    { id: "tools", label: "TOOLS" },
    { id: "pricing", label: "BẢNG GIÁ" },
    { id: "guide", label: "HƯỚNG DẪN" },
  ];

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <>
      <header className="custom-header">
        <div className="logo" onClick={handleLogoClick}>
          <span className="logo-text">
            <span className="ai">AI</span>Content
          </span>
        </div>

        <nav className="nav">
          {menuItems.map(({ id, label }) => {
            const isActive = location.pathname === `/${id}`;
            const [first, ...rest] = label.split(" ");
            const second = rest.join(" ");
            return (
              <Link
                key={id}
                to={`/${id}`}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                {first} {second && <span className="highlight"> {second}</span>}
              </Link>
            );
          })}
        </nav>

        <button className="login-btn" onClick={() => setShowLoginModal(true)}>
          Đăng nhập
        </button>
      </header>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  );
};

export default Header;
