import React, { useEffect, useState } from "react";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookingHistory();
  }, []);

  const fetchBookingHistory = async () => {
    try {
      const response = await fetch("/api/bookings/history", {
        headers: {
          "Content-Type": "application/json",
          // Nếu có xác thực JWT:
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Lỗi khi tải lịch sử");

      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Lỗi tải lịch sử:", error);
      alert("Không thể tải lịch sử đặt lịch.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-blue-700 text-center">📜 Lịch sử đặt lịch</h1>

      {loading ? (
        <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500">Bạn chưa có lịch sử đặt lịch nào.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-center border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Dịch vụ</th>
                <th className="border p-2">Thợ</th>
                <th className="border p-2">Thời gian</th>
                <th className="border p-2">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className="border p-2">{b.service}</td>
                  <td className="border p-2">{b.barber}</td>
                  <td className="border p-2">{new Date(b.datetime).toLocaleString()}</td>
                  <td className="border p-2">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        b.status === "PENDING"
                          ? "bg-yellow-500"
                          : b.status === "APPROVED"
                          ? "bg-green-600"
                          : "bg-red-500"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
