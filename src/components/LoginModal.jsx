import React, { useState } from "react";
import "./css/loginModal.css";
import { FcGoogle } from "react-icons/fc";

const LoginModal = ({ onClose }) => {
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      alert("Đăng ký thành công (giả lập)!");
    } else {
      alert("Đăng nhập thành công (giả lập)!");
    }
    onClose();
  };

  const handleGoogleLogin = () => {
    alert("Đăng nhập bằng Google (giả lập)!");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
      >
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Đóng modal"
        >
          ×
        </button>
        <h2 id="login-modal-title">
          {isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}
        </h2>

        <div className="tab-switcher">
          <button
            className={!isRegister ? "active" : ""}
            onClick={() => setIsRegister(false)}
          >
            Đăng nhập
          </button>
          <button
            className={isRegister ? "active" : ""}
            onClick={() => setIsRegister(true)}
          >
            Đăng ký
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {isRegister && (
            <label>
              Họ và tên
              <input type="text" placeholder="Nhập họ tên" required />
            </label>
          )}

          <label>
            Email 
            <input type="text" placeholder="Nhập email" required />
          </label>

          <label>
            Mật khẩu
            <input type="password" placeholder="Nhập mật khẩu" required />
          </label>

          {isRegister && (
            <>
              <label>
                Số điện thoại
                <input type="tel" placeholder="Nhập số điện thoại" required />
              </label>
              <label>
                Xác nhận mật khẩu
                <input type="password" placeholder="Nhập lại mật khẩu" required />
              </label>
            
            </>
          )}

          <button type="submit" className="submit-btn">
            {isRegister ? "Đăng ký" : "Đăng nhập"}
          </button>
        </form>

        <button className="google-login-btn" onClick={handleGoogleLogin}>
          <FcGoogle size={20} style={{ marginRight: 8 }} />
          Đăng nhập bằng Google
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
