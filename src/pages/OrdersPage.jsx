import React, { useEffect, useState } from "react";
import Header from "../components/Header"; // ✅ Thêm Header
import "./css/orders.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Bạn cần đăng nhập để xem đơn hàng.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://server-hxhc.onrender.com/api/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setOrders(data.orders || []);
      } else {
        setError(data.message || "Lỗi khi lấy danh sách đơn hàng.");
      }
    } catch (err) {
      setError("Lỗi kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleConfirmPayment = async (orderId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`https://server-hxhc.onrender.com/api/orders/confirm-payment/${orderId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        fetchOrders();
      } else {
        alert(data.message || "Có lỗi xảy ra.");
      }
    } catch (err) {
      alert("Lỗi khi xác nhận thanh toán.");
    }
  };

  return (
    <>
      <Header /> {/* ✅ Gắn Header vào trang */}
      <div className="orders-container">
        <h2>📦 Đơn hàng đã đặt</h2>

        {loading && <p>Đang tải đơn hàng...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <p>Bạn chưa có đơn hàng nào.</p>
        )}

        {!loading && orders.length > 0 && (
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Gói</th>
                <th>Tổng tiền (VND)</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.plan_name || order.plan?.name || order.plan_id}</td>
                  <td>{order.total}</td>
                  <td>
                    <span className={`status-badge status-${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{new Date(order.created_at).toLocaleString("vi-VN")}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default OrdersPage;
