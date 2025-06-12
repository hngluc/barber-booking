    // src/components/admin/UserManagement.jsx
import React, { useState } from 'react';
import UserList from './Admin/UserList'; // Re-use the existing UserList component
import CreateEmployeeForm from '../components/Admin/CreateEmployeeForm'; // Re-use the existing CreateEmployeeForm

const UserManagement = () => {
  const [showCreateEmpForm, setShowCreateEmpForm] = useState(false);
  const [refreshUserList, setRefreshUserList] = useState(0); // State to trigger UserList re-fetch

  const handleEmployeeCreated = () => {
    setShowCreateEmpForm(false);
    setRefreshUserList(prev => prev + 1); // Increment to trigger UserList useEffect
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 border-b pb-3">QUẢN LÝ NGƯỜI DÙNG</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tạo nhân viên mới</h2>
        <button
          onClick={() => setShowCreateEmpForm(!showCreateEmpForm)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition mb-4"
        >
          {showCreateEmpForm ? 'Ẩn form' : 'Thêm nhân viên mới'}
        </button>
        {showCreateEmpForm && (
          <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <CreateEmployeeForm onSuccess={handleEmployeeCreated} />
          </div>
        )}
      </div>

      <UserList key={refreshUserList} /> {/* Key change will force re-render and re-fetch */}
    </div>
  );
};

export default UserManagement;