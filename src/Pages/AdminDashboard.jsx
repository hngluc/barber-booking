// src/Pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
// Corrected imports for admin components, using '../' and 'Admin' (capital A)
import AdminLayout from '../components/Admin/AdminLayout';
import BookingManagement from '../components/Admin/BookingManagement';
import UserManagement from '../components/Admin/UserManagement';
import ServiceManagement from '../components/Admin/ServiceManagement';
import NewsManagement from '../components/Admin/NewsManagement';


export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (userRole !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <AdminLayout>
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

        <nav className="mb-8 border-b border-gray-200">
          <ul className="flex space-x-6">
            <li>
              <Link
                to="bookings"
                className={`pb-2 block ${
                  location.pathname.includes('/admin/bookings')
                    ? 'border-b-2 border-blue-600 text-blue-600 font-semibold'
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                Quản lý lịch đặt
              </Link>
            </li>
            <li>
              <Link
                to="users"
                className={`pb-2 block ${
                  location.pathname.includes('/admin/users')
                    ? 'border-b-2 border-blue-600 text-blue-600 font-semibold'
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                Quản lý người dùng
              </Link>
            </li>
            <li>
              <Link
                to="services"
                className={`pb-2 block ${
                  location.pathname.includes('/admin/services')
                    ? 'border-b-2 border-blue-600 text-blue-600 font-semibold'
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                Quản lý dịch vụ
              </Link>
            </li>
            <li>
              <Link
                to="news"
                className={`pb-2 block ${
                  location.pathname.includes('/admin/news')
                    ? 'border-b-2 border-blue-600 text-blue-600 font-semibold'
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                Quản lý tin tức
              </Link>
            </li>
          </ul>
        </nav>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Routes>
            <Route index element={<BookingManagement />} />
            <Route path="bookings" element={<BookingManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="services" element={<ServiceManagement />} />
            <Route path="news" element={<NewsManagement />} />
          </Routes>
        </div>
      </div>
    </AdminLayout>
  );
}