// Pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard({ user }) {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/'); // Không phải admin → đá về trang chủ
    } else {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/admin/bookings'); // gọi API riêng cho admin
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Lỗi tải lịch đặt:', error);
    }
  };

  const handleApprove = async (id) => {
    await fetch(`/api/admin/bookings/${id}/approve`, { method: 'PUT' });
    fetchBookings();
  };

  const handleCancel = async (id) => {
    await fetch(`/api/admin/bookings/${id}/cancel`, { method: 'PUT' });
    fetchBookings();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">QUẢN TRỊ LỊCH ĐẶT</h1>
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Khách hàng</th>
            <th className="border p-2">Số điện thoại</th>
            <th className="border p-2">Dịch vụ</th>
            <th className="border p-2">Thời gian</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="text-center">
              <td className="border p-2">{b.name}</td>
              <td className="border p-2">{b.phone}</td>
              <td className="border p-2">{b.service}</td>
              <td className="border p-2">{b.datetime}</td>
              <td className="border p-2">{b.status}</td>
              <td className="border p-2 space-x-2">
                <button className="text-green-600" onClick={() => handleApprove(b.id)}>Duyệt</button>
                <button className="text-red-600" onClick={() => handleCancel(b.id)}>Huỷ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
