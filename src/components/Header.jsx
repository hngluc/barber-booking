// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function Header({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.clear();
    onLogout(); // cập nhật state
    navigate("/");
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <header className="flex justify-between items-center p-4 shadow-md">
      <div className="text-xl font-bold text-blue-600 flex items-center">
        <img src="/logo.png" alt="TLap Logo" className="h-10 mr-2" />
        TLap
      </div>

      <nav className="hidden md:flex gap-6 text-gray-700">
        <a href="/" className="hover:text-blue-500">Trang chủ</a>
        <a href="/detail" className="hover:text-blue-500">Về TLap</a>
        <a href="#" className="hover:text-blue-500">Nhượng quyền</a>
        <a href="#" className="hover:text-blue-500">Đối tác</a>
        <a href="#" className="hover:text-blue-500">Nụ cười DV</a>
      </nav>

      <div className="flex items-center">
        {isLoggedIn && role === "ADMIN" && (
          <Button className="ml-2 bg-red-600 hover:bg-red-700" onClick={handleGoToDashboard}>
            Quản trị
          </Button>
        )}
        {isLoggedIn ? (
          <Button className="ml-4" onClick={handleLogout}>Đăng xuất</Button>
        ) : (
          <Button className="ml-4" onClick={() => navigate("/login")}>Đăng nhập</Button>
        )}
      </div>
    </header>
  );
}
