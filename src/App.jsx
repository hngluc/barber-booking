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
import Dashboard from './Admin/AdminDashboard';
import BookingHistory from './Pages/BookingHistory';


function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

useEffect(() => {
  const token = localStorage.getItem("token");
  setIsLoggedIn(!!token);

  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setCurrentUser(JSON.parse(storedUser));
  }
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
  const [currentUser, setCurrentUser] = useState(null);


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
        <Route path="/AdminDashboard" element={<Dashboard user={currentUser} />} />
        <Route path="/booking-history" element={<BookingHistory />} />
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
