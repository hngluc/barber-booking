// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { Button } from "./ui/button";

export default function Header({ isLoggedIn, onLogout, role }) { // Nhận role prop
  const navigate = useNavigate();
  // const [role, setRole] = useState(""); // Không cần state role riêng nữa, dùng prop

  // useEffect(() => { // Không cần useEffect này nữa, role được truyền từ App.jsx
  //   const storedRole = localStorage.getItem("role");
  //   if (storedRole) setRole(storedRole);
  // }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.clear();
    onLogout(); // cập nhật state
    navigate("/"); // Chuyển về trang chủ sau khi đăng xuất
  };

  const handleGoToAdminDashboard = () => { // Đổi tên hàm cho rõ ràng hơn
    navigate("/admin"); // Chuyển đến dashboard admin
  };

  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-gray-800 text-white">
      <div className="text-xl font-bold flex items-center">
        {/* Đổi màu text để nổi bật hơn trên nền tối */}
        <Link to="/" className="text-xl font-bold text-blue-400 flex items-center">
          <img src="/logo.png" alt="TLap Logo" className="h-10 mr-2" />
          TLap
        </Link>
      </div>

      <nav className="hidden md:flex gap-6 text-gray-200">
        <Link to="/" className="hover:text-blue-400">Trang chủ</Link>
        <Link to="/detail" className="hover:text-blue-400">Về TLap</Link>
        <Link to="/booking" className="hover:text-blue-400">Đặt lịch</Link> {/* Thêm link đặt lịch */}
        <Link to="/my-bookings" className="hover:text-blue-400">Lịch đặt của tôi</Link> {/* Thêm link xem lịch đặt cá nhân */}
        <a href="#" className="hover:text-blue-400">Nhượng quyền</a>
        <a href="#" className="hover:text-blue-400">Đối tác</a>
        <a href="#" className="hover:text-blue-400">Nụ cười DV</a>
      </nav>

      <div className="flex items-center">
        {isLoggedIn && role === "admin" && ( // Kiểm tra role là "admin"
          <Button
            className="ml-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold" // Màu nổi bật cho admin
            onClick={handleGoToAdminDashboard}
          >
            ADMIN
          </Button>
        )}

        {isLoggedIn ? (
          <Button
            className="ml-2 bg-red-600 hover:bg-red-700"
            onClick={handleLogout}
          >
            Đăng xuất
          </Button>
        ) : (
          <div className="space-x-2">
            <Link to="/login"> {/* Dùng Link thay vì button cho navigation */}
              <Button className="bg-blue-600 hover:bg-blue-700">Đăng nhập</Button>
            </Link>
            <Link to="/register"> {/* Dùng Link thay vì button cho navigation */}
              <Button className="bg-green-600 hover:bg-green-700">Đăng ký</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Hamburger menu cho mobile (chưa triển khai chi tiết) */}
      <div className="md:hidden">
        <button className="text-white text-2xl">&#9776;</button>
      </div>
    </header>
  );
}