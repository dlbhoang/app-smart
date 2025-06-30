import React, { useEffect, useState } from "react";
import { FaEdit, FaKey } from "react-icons/fa";
import Header from "../components/Header";
import ChangePasswordModal from "../components/ChangePasswordModal";
import "./css/profile.css";

const formatDate = (iso) => new Date(iso).toLocaleString("vi-VN");

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("https://server-hxhc.onrender.com/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
          setForm({
            name: data.user.name,
            phone: data.user.phone || "",
            email: data.user.email,
          });
        } else {
          alert(data.message);
        }
      } catch (err) {
        alert("Không thể kết nối đến server.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://server-hxhc.onrender.com/api/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Cập nhật thành công!");
        setUser(data.user);
        setEditing(false);
      } else {
        alert(data.message || "Cập nhật thất bại!");
      }
    } catch (err) {
      alert("Lỗi khi cập nhật.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="profile-container">Đang tải thông tin...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <Header />
        <div className="profile-container">Vui lòng đăng nhập để xem thông tin.</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="profile-container">
        <h2>👤 Hồ sơ cá nhân</h2>

        {editing ? (
          <form onSubmit={handleUpdate} className="edit-form">
            <div className="form-group">
              <label>Họ tên</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email (không thay đổi)</label>
              <input type="email" value={form.email} disabled />
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div className="action-buttons">
              <button type="submit" className="save-btn">
                💾 Lưu
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setEditing(false)}
              >
                ❌ Hủy
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>👤 Họ tên:</strong> {user.name}</p>
            <p><strong>📧 Email:</strong> {user.email}</p>
            <p><strong>📞 Số điện thoại:</strong> {user.phone || "Chưa có"}</p>
            <p><strong>💰 Credits:</strong> {user.credits}</p>
        
            <div className="action-buttons">
              <button onClick={() => setEditing(true)} className="edit-btn">
                <FaEdit /> Chỉnh sửa
              </button>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="change-pass-btn"
              >
                <FaKey /> Đổi mật khẩu
              </button>
            </div>
          </div>
        )}
      </div>

      {showPasswordModal && (
        <ChangePasswordModal
          token={token}
          onClose={() => setShowPasswordModal(false)}
        />
      )}
    </>
  );
};

export default ProfilePage;
