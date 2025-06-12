// src/components/admin/AdminLayout.jsx
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);
    if (role !== 'admin') {
      navigate('/login'); // Redirect if not admin
    }
  }, [navigate]);

  if (userRole !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 font-bold">Bạn không có quyền truy cập trang này!</p>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col p-4 shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-100">Admin Panel</h2>
        <nav className="flex-grow">
          <ul>
            <li className="mb-4">
              <Link to="/admin/bookings" className="block p-3 rounded-lg hover:bg-blue-700 transition duration-200">
                Lịch đặt
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/admin/users" className="block p-3 rounded-lg hover:bg-blue-700 transition duration-200">
                Quản lý người dùng
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/admin/services" className="block p-3 rounded-lg hover:bg-blue-700 transition duration-200">
                Quản lý dịch vụ
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/admin/news" className="block p-3 rounded-lg hover:bg-blue-700 transition duration-200">
                Quản lý tin tức
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet /> {/* This is where nested routes will render */}
      </main>
    </div>
  );
};

export default AdminLayout;