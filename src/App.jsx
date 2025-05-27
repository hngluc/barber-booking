import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom';

import Home from "./Pages/Home";
import LoginForm from "./Pages/LoginForm";
import RegisterForm from "./Pages/RegisterForm";
import Detail from "./Pages/Detail";

// Wrapper để dùng useNavigate
function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate("/"); // Quay về Home sau khi login
  };

  return (
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
          !isLoggedIn ? <RegisterForm /> : <Navigate replace to="/" />

        }
      />
      <Route path="/detail" element={<Detail />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

// App chính
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
