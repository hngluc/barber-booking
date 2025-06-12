// src/components/ServiceList.jsx (updated path for apiService)
import React, { useState, useEffect } from 'react';
import { apiService } from '../components/Services/apiService'; // Adjusted path
import ServiceForm from '../components/Admin/ServiceForm'; // Assuming ServiceForm is now in admin folder

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]); // Cho batch delete

  // const isAdmin = authService.isAdmin(); // Will rely on AdminLayout check

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await apiService.get('/services'); // Endpoint: GET /api/v1/services
      setServices(data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = (service) => {
    setEditingService(service);
    setShowForm(true);
  };

  const handleShowCreateForm = () => {
    setEditingService(null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) {
      try {
        await apiService.delete(`/admin/services/${id}`); // Endpoint: DELETE /api/v1/admin/services/{id}
        alert('Dịch vụ đã được xóa thành công!');
        fetchServices();
      } catch (err) {
        setError(err.message || 'Không thể xóa dịch vụ.');
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingService(null);
    fetchServices(); // Refresh the list
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((serviceId) => serviceId !== id) : [...prev, id]
    );
  };

  const handleDeleteBatch = async () => {
    if (selectedIds.length === 0) {
      alert('Vui lòng chọn ít nhất một dịch vụ để xóa.');
      return;
    }
    if (window.confirm(`Bạn có chắc chắn muốn xóa ${selectedIds.length} dịch vụ đã chọn?`)) {
      try {
        await apiService.delete('/admin/services/batch', { ids: selectedIds }); // Endpoint: DELETE /api/v1/admin/services/batch (assuming a batch delete endpoint)
        alert('Các dịch vụ đã chọn đã được xóa thành công!');
        setSelectedIds([]);
        fetchServices();
      } catch (err) {
        setError(err.message || 'Không thể xóa các dịch vụ đã chọn.');
      }
    }
  };

  if (loading) return <p>Đang tải dịch vụ...</p>;
  if (error) return <p style={{ color: 'red' }}>Lỗi: {error}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Quản lý dịch vụ</h2>

      <div className="mb-4 space-x-2">
        <button
          onClick={handleShowCreateForm}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Thêm dịch vụ mới
        </button>
        {selectedIds.length > 0 && (
          <button
            onClick={handleDeleteBatch}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Xóa đã chọn ({selectedIds.length})
          </button>
        )}
      </div>

      {showForm && (
        <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <ServiceForm
            existingService={editingService}
            onSuccess={handleFormSuccess}
            onCancel={() => { setShowForm(false); setEditingService(null); }}
          />
        </div>
      )}

      {services.length === 0 && !loading && <p className="text-gray-500">Không tìm thấy dịch vụ nào.</p>}
      <div className="space-y-4">
        {services.map(service => (
          <div key={service.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex items-center space-x-4">
            <input
              type="checkbox"
              checked={selectedIds.includes(service.id)}
              onChange={() => handleCheckboxChange(service.id)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            {service.imageUrl && <img src={service.imageUrl} alt={service.name} className="w-20 h-20 object-cover rounded" />}
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>
              <p className="text-sm text-gray-500">Giá: ${service.price} - Thời gian: {service.estimatedTime} phút</p>
              <p className="text-sm text-gray-500">Hoạt động: {service.active ? 'Có' : 'Không'}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(service)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
              >
                Sửa
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;