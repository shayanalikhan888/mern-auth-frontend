import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PublicGuard from "./components/PublicGuard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import AuthGuard from "./components/AuthGuard";
import Layout from "./components/Layout";
import { useState } from "react";
import UserContext from "./libs/context";
import Verify2FA from "./components/verify2FA";
import Security from "./components/Security";
import SecurityGuard from "./components/SecurityGuard";
import SetupVerifyEmail from "./components/SetupVerifyEmail";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Setup2FA from "./components/Setup2FA";
import VerifyEmail from "./components/VerifyEmail";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicGuard />}>
            <Route path="/login" element={<Login />} />
            <Route path="/2fa" element={<Verify2FA />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          <Route element={<AuthGuard />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/security" element={<Security />} />
              <Route element={<SecurityGuard />}>
                <Route
                  path="/setup-email-verify"
                  element={<SetupVerifyEmail />}
                />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/setup-2fa" element={<Setup2FA />} />
              </Route>
            </Route>
          </Route>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
