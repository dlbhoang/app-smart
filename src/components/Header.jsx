import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import LoginModal from "./LoginModal";
import "./css/header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [showDropdown, setShowDropdown] = useState(false);

  const menuItems = [
    { id: "smart-writer", label: "AI WRITER" },
    { id: "pricing", label: "BẢNG GIÁ" },
    { id: "guide", label: "HƯỚNG DẪN" },
  ];

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setShowDropdown(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".account-container")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
                {first} {second && <span className="highlight">{second}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="auth-section">
          {user ? (
            <div className="account-container">
              <FaUserCircle
                size={28}
                onClick={() => setShowDropdown(!showDropdown)}
                style={{ cursor: "pointer" }}
              />
              {showDropdown && (
                <div className="dropdown-menu">
                  <p>👋 Xin chào, {user.name}</p>

                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/profile");
                    }}
                  >
                    Thông tin tài khoản
                  </button>

                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/orders");
                    }}
                  >
                    Đơn hàng đã đặt
                  </button>

                  <button
                    onClick={handleLogout}
                    style={{ backgroundColor: "#f44336" }}
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="login-btn" onClick={() => setShowLoginModal(true)}>
              Đăng nhập
            </button>
          )}
        </div>
      </header>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          setUser={setUser}
        />
      )}
    </>
  );
};

export default Header;
