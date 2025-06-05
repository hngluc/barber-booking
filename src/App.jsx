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

import Home from "./Pages/Home";
import LoginForm from "./Pages/LoginForm";
import RegisterForm from "./Pages/RegisterForm";
import Detail from "./Pages/Detail";
import ServiceDetail from "./Pages/ServiceDetail";
import BookingForm from "./Pages/BookingForm";
import Header from "./components/Header"; 

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const hideHeaderRoutes = ["/login", "/register"];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
    {shouldShowHeader && (
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
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
        <Route path="/admin" element={<div className="p-10">Trang Quản Trị</div>} />
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
