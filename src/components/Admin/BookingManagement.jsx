// src/components/admin/BookingManagement.jsx (was Dashboard.jsx)
import React, { useEffect, useState } from 'react';
import { apiService } from '../components/Services/apiService'; // Using apiService

export default function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      // Assuming this endpoint requires admin role authentication
      const data = await apiService.get('/admin/bookings');
      setBookings(data || []);
    } catch (err) {
      setError(err.message || 'Lỗi khi tải lịch đặt.');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleApprove = async (id) => {
    try {
      await apiService.put(`/admin/bookings/${id}/approve`);
      alert('Đã duyệt lịch đặt!');
      fetchBookings();
    } catch (err) {
      setError(err.message || 'Lỗi khi duyệt lịch đặt.');
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy lịch đặt này?')) {
      try {
        await apiService.put(`/admin/bookings/${id}/cancel`);
        alert('Đã hủy lịch đặt!');
        fetchBookings();
      } catch (err) {
        setError(err.message || 'Lỗi khi hủy lịch đặt.');
      }
    }
  };

  if (loading) return <div className="p-6">Đang tải lịch đặt...</div>;
  if (error) return <div className="p-6 text-red-500">Lỗi: {error}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 border-b pb-3">QUẢN LÝ LỊCH ĐẶT</h1>
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3 text-left">Khách hàng</th>
            <th className="border p-3 text-left">Số điện thoại</th>
            <th className="border p-3 text-left">Dịch vụ</th>
            <th className="border p-3 text-left">Thời gian</th>
            <th className="border p-3 text-left">Thợ</th>
            <th className="border p-3 text-left">Trạng thái</th>
            <th className="border p-3 text-left">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center p-4 text-gray-500">
                Không có lịch đặt nào.
              </td>
            </tr>
          ) : (
            bookings.map((b) => (
              <tr key={b.id} className="text-center hover:bg-gray-50">
                <td className="border p-3">{b.name}</td>
                <td className="border p-3">{b.phone}</td>
                <td className="border p-3">{b.service}</td>
                <td className="border p-3">{new Date(b.datetime).toLocaleString()}</td>
                <td className="border p-3">{b.barber}</td>
                <td className="border p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    b.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    b.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="border p-3 space-x-2">
                  {b.status === 'PENDING' && (
                    <button
                      onClick={() => handleApprove(b.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                    >
                      Duyệt
                    </button>
                  )}
                  {b.status !== 'CANCELED' && (
                    <button
                      onClick={() => handleCancel(b.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Hủy
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}