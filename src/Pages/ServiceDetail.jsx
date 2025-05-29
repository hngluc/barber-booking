// Pages/ServiceDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { services } from '../data/services';

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const service = services.find((s) => s.id === serviceId);

  if (!service) return <div className="p-10 text-center text-red-500">Không tìm thấy dịch vụ</div>;

  return (
    <div className="px-6 md:px-20 py-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">{service.title}</h1>
      <p className="mb-6 text-lg text-gray-600">{service.description}</p>

      <div className="grid md:grid-cols-2 gap-6">
        {service.combos.map((combo, index) => (
          <div key={index} className="border rounded shadow p-4 bg-white">
            <img src={combo.image} alt={combo.name} className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="text-xl font-semibold mb-1">{combo.name}</h3>
            <p className="text-gray-500">{combo.duration}</p>
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Đặt ngay
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
