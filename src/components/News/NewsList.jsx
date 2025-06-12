// src/components/NewsList.jsx (updated path for apiService)
import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService'; // Adjusted path
import NewsForm from './NewsForm'; // Assuming NewsForm is in the same components folder

// Giả định có authService để kiểm tra vai trò admin
// import { authService } from '../../services/authService';

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingNews, setEditingNews] = useState(null); // Tin tức đang được sửa
  const [showForm, setShowForm] = useState(false);

  // const isAdmin = authService.isAdmin(); // Kiểm tra vai trò admin - will rely on AdminLayout

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await apiService.get('/news'); // Endpoint: GET /api/v1/news (public endpoint)
      setNewsList(data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setNewsList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tin tức này?')) {
      try {
        await apiService.delete(`/admin/news/${id}`); // Endpoint: DELETE /api/v1/admin/news/{id}
        alert('Tin tức đã được xóa thành công!');
        fetchNews();
      } catch (err) {
        setError(err.message || 'Không thể xóa tin tức.');
      }
    }
  };

  const handleEdit = (news) => {
    setEditingNews(news);
    setShowForm(true);
  };

  const handleShowCreateForm = () => {
    setEditingNews(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingNews(null);
    fetchNews(); // Refresh the list
  };

  if (loading) return <p>Đang tải tin tức...</p>;
  if (error) return <p style={{ color: 'red' }}>Lỗi: {error}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Quản lý tin tức</h2>

      <button
        onClick={handleShowCreateForm}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-4"
      >
        Thêm tin tức mới
      </button>

      {showForm && (
        <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <NewsForm
            existingNews={editingNews}
            onSuccess={handleFormSuccess}
            onCancel={() => { setShowForm(false); setEditingNews(null); }}
          />
        </div>
      )}

      {newsList.length === 0 && !loading && <p className="text-gray-500">Không có tin tức nào.</p>}
      <ul className="space-y-4">
        {newsList.map((news) => (
          <li key={news.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
            <p className="text-gray-700 mb-2">{news.content?.substring(0, 200)}...</p> {/* Hiển thị một phần nội dung */}
            {news.imageUrl && <img src={news.imageUrl} alt={news.title} className="max-w-xs h-auto rounded mb-2" />}
            <p className="text-sm text-gray-500"><em>Tác giả: {news.author}</em></p>
            <p className="text-sm text-gray-500"><small>Ngày: {new Date(news.date).toLocaleDateString()}</small></p>
            <div className="mt-3 space-x-2">
              <button
                onClick={() => handleEdit(news)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
              >
                Sửa
              </button>
              <button
                onClick={() => handleDelete(news.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;