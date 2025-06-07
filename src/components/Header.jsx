import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LoginModal from "./LoginModal";
import "./css/header.css";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(null);
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
    navigate('/');
  };
  return (
    <>
      <header className="header">
        <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
      <span className="logo-text">AIContent</span>
    </div>

        <ul className="nav">
          {menuItems.map(({ id, label }, index) => {
            const [part1, part2] = label.split(" ");
            const isActive = location.pathname === `/${id}`;
            return (
              <li key={id}>
                <Link
                  to={`/${id}`}
                  className={isActive ? "active" : ""}
                  onClick={() => setActiveIndex(index)}
                >
                  {part1}
                  {part2 ? <span className="blue"> {part2}</span> : ""}
                </Link>
              </li>
            );
          })}
        </ul>

        <button className="login-btn" onClick={() => setShowLoginModal(true)}>
          Đăng nhập
        </button>
      </header>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  );
};

export default Header;
