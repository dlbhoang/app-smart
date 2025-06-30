// components/ChangePasswordModal.jsx
import React, { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import "./css/changePasswordModal.css";

const ChangePasswordModal = ({ onClose, token }) => {
  const [passForm, setPassForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handlePassChange = (e) =>
    setPassForm({ ...passForm, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { old_password, new_password, confirm_password } = passForm;

    if (new_password !== confirm_password) {
      alert("❌ Mật khẩu mới không khớp!");
      return;
    }

    try {
      const res = await fetch("https://server-hxhc.onrender.com/api/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ old_password, new_password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Đổi mật khẩu thành công!");
        onClose();
      } else {
        alert(data.message || "Đổi mật khẩu thất bại!");
      }
    } catch (err) {
      alert("Lỗi khi đổi mật khẩu.");
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <h3>🔐 Đổi mật khẩu</h3>
        <form onSubmit={handleSubmit} className="password-form">
          <div className="form-group">
            <label>Mật khẩu hiện tại</label>
            <input
              type="password"
              name="old_password"
              value={passForm.old_password}
              onChange={handlePassChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu mới</label>
            <input
              type="password"
              name="new_password"
              value={passForm.new_password}
              onChange={handlePassChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Xác nhận mật khẩu mới</label>
            <input
              type="password"
              name="confirm_password"
              value={passForm.confirm_password}
              onChange={handlePassChange}
              required
            />
          </div>
          <div className="action-buttons">
            <button type="submit" className="save-btn">
              <FaSave /> Cập nhật mật khẩu
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              <FaTimes /> Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
