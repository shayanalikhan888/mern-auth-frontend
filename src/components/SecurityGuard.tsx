import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../libs/context";

const SecurityGuard = () => {
  const { user } = useContext(UserContext);

  if (!user) return null;

  const isEmailVerified =
    user.authProvider === "google" ? true : user.isEmailVerified;

  const is2FAEnabled = user.twoFactorEnabled;

  if (isEmailVerified && is2FAEnabled) {
    return <Navigate to="/security" replace />;
  }

  return <Outlet />;
};

export default SecurityGuard;
