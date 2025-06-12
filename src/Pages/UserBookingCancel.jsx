// src/Pages/UserBookingCancel.jsx
import React, { useEffect, useState } from 'react';
import { apiService } from '../components/Services/apiService'; // Corrected path
import { useNavigate } from 'react-router-dom';

export default function UserBookingCancel() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.get('/user/bookings');
      setBookings(response || []);
    } catch (err) {
      setError(err.message || "Failed to fetch bookings.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await apiService.put(`/user/bookings/${id}/cancel`);
        alert("Booking cancelled successfully!");
        fetchUserBookings();
      } catch (err) {
        alert(`Error cancelling booking: ${err.message}`);
      }
    }
  };

  if (loading) return <div className="p-6 text-center">Loading your bookings...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Lịch đặt của tôi</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-600">Bạn chưa có lịch đặt nào.</p>
      ) : (
        <table className="min-w-full border text-sm bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-3 text-left">Dịch vụ</th>
              <th className="border p-3 text-left">Thợ cắt</th>
              <th className="border p-3 text-left">Thời gian</th>
              <th className="border p-3 text-left">Trạng thái</th>
              <th className="border p-3 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="text-gray-700 hover:bg-gray-50">
                <td className="border p-3">{b.serviceName}</td>
                <td className="border p-3">{b.barberName}</td>
                <td className="border p-3">{new Date(b.dateTime).toLocaleString()}</td>
                <td className="border p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      b.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                      b.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="border p-3">
                  {b.status === 'PENDING' && (
                    <button
                      onClick={() => handleCancelBooking(b.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                    >
                      Hủy lịch
                    </button>
                  )}
                  {b.status === 'APPROVED' && (
                     <span className="text-green-600 text-xs">Đã xác nhận</span>
                  )}
                   {b.status === 'CANCELLED' && (
                     <span className="text-gray-500 text-xs">Đã hủy</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}   