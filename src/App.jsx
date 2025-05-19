import { useState } from "react";
import BookingForm from "./components/BookingForm";
import LoginForm from "./Pages/LoginForm";
import RegisterForm from "./Pages/RegisterForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mode, setMode] = useState("login"); // "login" hoặc "register"

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!isLoggedIn ? (
        mode === "login" ? (
          <LoginForm
            onSwitchToRegister={() => setMode("register")}
            onLoginSuccess={handleLoginSuccess}
          />
        ) : (
          <RegisterForm onSwitchToLogin={() => setMode("login")} />
        )
      ) : (
        <BookingForm />
      )}
    </div>
  );
}

export default App;
