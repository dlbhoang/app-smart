import React, { useState } from "react";

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("Mật khẩu mới không khớp!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://server-hxhc.onrender.com/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Đổi mật khẩu thất bại!");
        return;
      }

      alert("Đổi mật khẩu thành công!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      console.error("Lỗi khi đổi mật khẩu:", err);
      alert("Đã xảy ra lỗi.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Đổi mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Mật khẩu hiện tại</label><br />
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mật khẩu mới</label><br />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Xác nhận mật khẩu mới</label><br />
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>Xác nhận</button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
