import React, { useState, useEffect } from "react";
import SmartWriterFlow from "../components/SmartWriter";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal"; // ✅ import modal
import { useNavigate } from "react-router-dom";

const SmartWriterPage = () => {
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    } else {
      setShowLoginModal(true); // ❌ Chưa đăng nhập → hiển thị modal
    }
  }, []);

  return (
    <div>
      <Header user={user} />
      {showLoginModal ? (
       <LoginModal
  onClose={() => navigate("/")} // ✅ chuyển hướng về /dashboard
  setUser={(user) => {
    setUser(user);
    setShowLoginModal(false);
  }}
/>

      ) : (
        <SmartWriterFlow />
      )}
      <Footer />
    </div>
  );
};

export default SmartWriterPage;
