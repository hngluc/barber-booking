// src/components/admin/ServiceForm.jsx
import React, { useState, useEffect } from 'react';
import { apiService } from '../components/Services/apiService';

const ServiceForm = ({ existingService, onSuccess, onCancel }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [active, setActive] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const isEditing = !!existingService;

  useEffect(() => {
    if (isEditing) {
      setName(existingService.name || '');
      setPrice(existingService.price || '');
      setEstimatedTime(existingService.estimatedTime || '');
      setDescription(existingService.description || '');
      setImageUrl(existingService.imageUrl || '');
      setActive(existingService.active !== undefined ? existingService.active : true);
    } else {
      // Reset form for new creation
      setName('');
      setPrice('');
      setEstimatedTime('');
      setDescription('');
      setImageUrl('');
      setActive(true);
    }
  }, [existingService, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const serviceData = { name, price: parseFloat(price), estimatedTime: parseInt(estimatedTime), description, imageUrl, active };

    try {
      if (isEditing) {
        await apiService.put(`/admin/services/${existingService.id}`, serviceData); // Endpoint: PUT /api/v1/admin/services/{id}
      } else {
        await apiService.post('/admin/services', serviceData); // Endpoint: POST /api/v1/admin/services
      }
      alert(`Dịch vụ đã được ${isEditing ? 'cập nhật' : 'tạo'} thành công!`);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || "Không thể lưu dịch vụ.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md space-y-4">
      <h3 className="text-xl font-bold text-blue-700">{isEditing ? 'Sửa dịch vụ' : 'Thêm dịch vụ mới'}</h3>
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Tên dịch vụ:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Giá:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          step="0.01"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label htmlFor="estimatedTime" className="block text-gray-700 text-sm font-bold mb-2">Thời gian ước tính (phút):</label>
        <input
          type="number"
          id="estimatedTime"
          value={estimatedTime}
          onChange={(e) => setEstimatedTime(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Mô tả:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      <div>
        <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">URL hình ảnh:</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="active"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
          className="mr-2 leading-tight"
        />
        <label htmlFor="active" className="text-gray-700">Hoạt động</label>
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
        >
          {submitting ? 'Đang gửi...' : (isEditing ? 'Cập nhật' : 'Tạo mới')}
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

export default ServiceForm;