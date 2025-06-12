// src/components/admin/NewsManagement.jsx
import React from 'react';
import NewsList from '../components/News/NewsList'; // Re-use the existing NewsList

const NewsManagement = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-700 mb-6 border-b pb-3">QUẢN LÝ TIN TỨC</h1>
      <NewsList />
    </div>
  );
};

export default NewsManagement;