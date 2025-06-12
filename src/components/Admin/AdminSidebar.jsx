import React from 'react';
import { NavLink } from 'react-router-dom';
// Cài đặt: npm install lucide-react
import { LayoutDashboard, Users, Scissors, Newspaper } from 'lucide-react';

const AdminSidebar = () => {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center px-4 py-3 text-gray-200 rounded-lg hover:bg-gray-700 transition-colors duration-200 ${
      isActive ? 'bg-gray-700 font-semibold' : ''
    }`;

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 h-screen flex flex-col p-4">
      <div className="text-2xl font-bold text-white mb-8 flex items-center justify-center">
        <img src="/logo.png" alt="TLap Logo" className="h-10 mr-2" />
        <span>Admin</span>
      </div>
      <nav className="flex flex-col gap-2">
        <NavLink to="/admin/dashboard" className={navLinkClasses}>
          <LayoutDashboard className="mr-3 h-5 w-5" />
          Tổng quan
        </NavLink>
        <NavLink to="/admin/users" className={navLinkClasses}>
          <Users className="mr-3 h-5 w-5" />
          Quản lý người dùng
        </NavLink>
        <NavLink to="/admin/services" className={navLinkClasses}>
          <Scissors className="mr-3 h-5 w-5" />
          Quản lý dịch vụ
        </NavLink>
        <NavLink to="/admin/news" className={navLinkClasses}>
          <Newspaper className="mr-3 h-5 w-5" />
          Quản lý tin tức
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;