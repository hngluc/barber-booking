// src/components/UserList.jsx
import React, { useState, useEffect } from 'react';
import { apiService } from '../components/Services/apiService'; // Adjusted path
// import CreateEmployeeForm from './CreateEmployeeForm'; // Will be handled in UserManagement

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'employee', 'customer'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [showCreateEmpForm, setShowCreateEmpForm] = useState(false); // Managed by UserManagement

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    let endpoint = '/admin/users'; // GET /api/v1/admin/users
    if (filter === 'employee') {
      endpoint = '/admin/users/employee'; // GET /api/v1/admin/users/employee
    } else if (filter === 'customer') {
      endpoint = '/admin/users/customer'; // GET /api/v1/admin/users/customer
    }
    try {
      const response = await apiService.get(endpoint);
      setUsers(response.users || []); // Assuming backend returns { users: [...] }
    } catch (err) {
      setError(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Quản lý người dùng</h2>
      <div className="mb-4 space-x-2">
        <span className="font-semibold">Lọc theo:</span>
        <button
          onClick={() => setFilter('all')}
          disabled={filter === 'all'}
          className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Tất cả
        </button>
        <button
          onClick={() => setFilter('employee')}
          disabled={filter === 'employee'}
          className={`px-4 py-2 rounded-lg ${filter === 'employee' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Nhân viên
        </button>
        <button
          onClick={() => setFilter('customer')}
          disabled={filter === 'customer'}
          className={`px-4 py-2 rounded-lg ${filter === 'customer' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Khách hàng
        </button>
      </div>

      {users.length === 0 && !loading && <p className="text-gray-500">Không tìm thấy người dùng nào cho bộ lọc này.</p>}
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3 text-left">ID</th>
            <th className="border p-3 text-left">Tên</th>
            <th className="border p-3 text-left">Email</th>
            <th className="border p-3 text-left">Vai trò</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border p-3">{user.id}</td>
              <td className="border p-3">{user.name}</td>
              <td className="border p-3">{user.email}</td>
              <td className="border p-3">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;