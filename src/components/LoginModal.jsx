import React, { useState } from "react";
import "./css/loginModal.css";
import { FcGoogle } from "react-icons/fc";

const LoginModal = ({ onClose, setUser }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const BASE_URL = "https://server-hxhc.onrender.com";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister && form.password !== form.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    setLoading(true);

    const url = isRegister
      ? `${BASE_URL}/api/auth/register`
      : `${BASE_URL}/api/auth/login`;

    const payload = isRegister
      ? {
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
        }
      : {
          email: form.email,
          password: form.password,
        };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Đã xảy ra lỗi!");
        return;
      }

      alert(data.message);

      if (!isRegister) {
        // ✅ Lưu token và user vào localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user); // ✅ Cập nhật user cho Header
      }

      onClose(); // đóng modal
    } catch (error) {
      alert("Lỗi kết nối tới server!");
      console.error(error);
    } finally {
      setLoading(false);
    }
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
        <button className="close-btn" onClick={onClose} aria-label="Đóng modal">
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
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nhập họ tên"
                required
              />
            </label>
          )}

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Nhập email"
              required
            />
          </label>

          <label>
            Mật khẩu
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              required
            />
          </label>

          {isRegister && (
            <>
              <label>
                Số điện thoại
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại"
                  required
                />
              </label>
              <label>
                Xác nhận mật khẩu
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Nhập lại mật khẩu"
                  required
                />
              </label>
            </>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading
              ? "Đang xử lý..."
              : isRegister
              ? "Đăng ký"
              : "Đăng nhập"}
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
