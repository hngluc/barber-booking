import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Các component con của route admin sẽ được render ở đây */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;