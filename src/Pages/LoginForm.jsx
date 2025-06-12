import React, { useState } from "react";

const LoginForm = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Bước 1: Gửi yêu cầu đăng nhập
      const response = await fetch("http://localhost:8080/api/v1/auth/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Đăng nhập thất bại.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // Lưu token

      // ✅ Bước 2: Gọi /user/me để lấy role
      const meRes = await fetch("http://localhost:8080/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      if (!meRes.ok) {
        throw new Error("Không thể lấy thông tin người dùng.");
      }

      const meData = await meRes.json();
      localStorage.setItem("role", meData.role); // Lưu role

      alert("🟢 Đăng nhập thành công!");
      if (onLoginSuccess) onLoginSuccess(); // Gọi callback cập nhật login
    } catch (error) {
      console.error("Login error:", error);
      alert(`❌ Lỗi: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-700">🔐 Đăng nhập tài khoản</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition disabled:opacity-50"
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-blue-600 hover:underline font-medium"
          >
            Đăng ký ngay
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
