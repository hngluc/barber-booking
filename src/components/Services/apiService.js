// src/services/apiService.js
const API_BASE_URL = '/api/v1'; // Giả sử proxy đã được cấu hình trong package.json

// Hàm helper để xử lý response
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || 'Something went wrong');
  }
  if (response.status === 204 || response.headers.get('Content-Length') === '0') { // No content
    return null;
  }
  // Try to parse JSON, if it fails, return raw response or throw error
  try {
    return await response.json();
  } catch (e) {
    // If response is OK but not JSON (e.g., plain text success message), return it
    if (response.ok) {
        return await response.text(); // Return text if JSON parsing fails but response is ok
    }
    throw new Error('Failed to parse JSON response or unknown error');
  }
};

// Hàm helper để lấy token (sử dụng 'token' như trong LoginForm.jsx)
const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); // Changed from 'authToken' to 'token'
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

export const apiService = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
  put: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
  delete: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      ...(data && { body: JSON.stringify(data) }), // For batch delete
    });
    // Delete can return 200 OK with message or 204 No Content
    if (response.status === 204) return null;
    if (response.ok && response.headers.get('Content-Length') === '0') return null; // Handle empty body for 200/201
    return handleResponse(response); // Attempt to parse response even if it's not 204
  },
};