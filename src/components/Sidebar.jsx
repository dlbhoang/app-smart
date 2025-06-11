import React from 'react';
import './css/Sider.css'; // <--- Thêm dòng này
import { FaTachometerAlt, FaUsers, FaProjectDiagram, FaMoneyBill, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  const menuItems = [
    { icon: <FaTachometerAlt />, label: 'Dashboard' },
    { icon: <FaUsers />, label: 'Người dùng' },
    { icon: <FaProjectDiagram />, label: 'Dự án' },
    { icon: <FaMoneyBill />, label: 'Thanh toán' },
    { icon: <FaCog />, label: 'Cài đặt' },
  ];

  return (
    <aside className="sidebar">
      <h1>Admin Panel</h1>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
