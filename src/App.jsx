// src/App.jsx
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';

// Corrected imports - ensure 'pages' is lowercase
import Home from "./Pages/Home";
import LoginForm from "./Pages/LoginForm";
import RegisterForm from "./Pages/RegisterForm";
import Detail from "./Pages/Detail";
import ServiceDetail from "./Pages/ServiceDetail";
import BookingForm from "./Pages/BookingForm";
import Header from "./components/Header";
import AdminDashboard from './Pages/AdminDashboard';
import UserBookingCancel from './Pages/UserBookingCancel';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    setIsLoggedIn(!!token);
    setRole(userRole);
  }, []);

  const handleLoginSuccess = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRole(null);
    navigate("/login");
  };

  const hideHeaderRoutes = ["/login", "/register"];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname) && !location.pathname.startsWith('/admin');

  return (
    <>
      {shouldShowHeader && (
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} role={role} />
      )}

      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <LoginForm
                onLoginSuccess={handleLoginSuccess}
                onSwitchToRegister={() => navigate("/register")}
              />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isLoggedIn ? (
              <RegisterForm onSwitchToLogin={() => navigate("/login")} />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
        <Route path="/detail" element={<Detail />} />
        <Route path="/service/:serviceId" element={<ServiceDetail />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/my-bookings" element={<UserBookingCancel />} />

        <Route
          path="/admin/*"
          element={isLoggedIn && role === 'admin' ? <AdminDashboard /> : <Navigate replace to="/login" />}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;