import React from 'react';
import './Footer.css';
import { FaFacebookF, FaXTwitter, FaYoutube, FaGlobe } from 'react-icons/fa6';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-links">
          <a href="/pricing">Bảng giá</a>
          <span>-</span>
          <a href="#">Affiliate Program</a>
          <span>-</span>
          <a href="#">API</a>
          <span>-</span>
          <a href="#">Contact</a>
          <span>-</span>
          <a href="#">Video</a>
          <span>-</span>
          <a href="#">Docs</a>
        </div>
        <div className="footer-meta">
 <Link to="/disclaimer" style={{ textDecoration: "none", color: "#0d6efd" }}>
      <span>Miễn trừ trách nhiệm</span>
    </Link>          <span>-</span>
<Link to="/privacy-policy" style={{ textDecoration: "none", color: "#0d6efd" }}>
      <span>Điều khoản</span>
    </Link>          <span>-</span>
          <span>2025 © Ai.com</span>
        </div>
      </div>

      <div className="footer-right">
        <div className="footer-icons">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaXTwitter /></a>
          <a href="#"><FaYoutube /></a>
        </div>
        <button className="lang-button">
          <FaGlobe className="globe-icon" /> Vietnamese
        </button>
      </div>
    </footer>
  );
};

export default Footer;
