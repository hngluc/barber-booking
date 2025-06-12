// src/components/NewsForm.jsx (updated path for apiService)
import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService'; // Adjusted path

// Dựa trên NewsDTO và NewsService
// NewsDTO fields: id, title, content, author, date (tự gán), imageUrl
const NewsForm = ({ existingNews, onSuccess, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState(''); // Hoặc lấy từ user đăng nhập nếu cần
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const isEditing = !!existingNews;

  useEffect(() => {
    if (isEditing) {
      setTitle(existingNews.title || '');
      setContent(existingNews.content || '');
      setAuthor(existingNews.author || '');
      setImageUrl(existingNews.imageUrl || '');
    } else {
      // Reset form cho trường hợp tạo mới
      setTitle('');
      setContent('');
      setAuthor(''); // Hoặc gán mặc định
      setImageUrl('');
    }
  }, [existingNews, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const newsData = { title, content, author, imageUrl };
    // NewsService không yêu cầu date từ client khi create
    // Endpoint: POST /api/v1/admin/news hoặc PUT /api/v1/admin/news/{id}

    try {
      if (isEditing) {
        await apiService.put(`/admin/news/${existingNews.id}`, newsData);
      } else {
        await apiService.post('/admin/news', newsData);
      }
      alert(`Tin tức đã được ${isEditing ? 'cập nhật' : 'tạo'} thành công!`);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Không thể lưu tin tức.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md space-y-4">
      <h3 className="text-xl font-bold text-blue-700">{isEditing ? 'Sửa tin tức' : 'Tạo tin tức mới'}</h3>
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Tiêu đề:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Nội dung:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="5"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      <div>
        <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">Tác giả:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">URL Hình ảnh:</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
        >
          {submitting ? 'Đang gửi...' : (isEditing ? 'Cập nhật tin tức' : 'Tạo tin tức')}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
        >
          Hủy
        </button>
      </div>
    </form>
  );
};

export default NewsForm;