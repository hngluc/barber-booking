// src/components/admin/ServiceManagement.jsx
import React from 'react';
import ServiceList from '../components/Admin/ServiceList'; // Re-use the existing ServiceList

const ServiceManagement = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-700 mb-6 border-b pb-3">QUẢN LÝ DỊCH VỤ</h1>
      <ServiceList />
    </div>
  );
};

export default ServiceManagement;