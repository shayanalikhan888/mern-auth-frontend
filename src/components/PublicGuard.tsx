import { useEffect, useState } from "react";
import api from "../libs/axios";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PublicGuard = () => {
  const location = useLocation();
  const [isLoggedIn, setIsloggedIn] = useState<null | boolean>(null);
  const [isLoading, setIsLoading] = useState<null | boolean>(null);

  useEffect(() => {
    const session = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get("/auth/verify-token");
        setIsloggedIn(data.data.loggedIn);
        if (!data) {
          setIsloggedIn(false);
        }
      } catch (err: any) {
        console.log(err?.response?.data?.message || err.message);
      } finally {
        setIsLoading(false);
      }
    };
    session();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (location.pathname === "/2fa") {
    return <Outlet />;
  }

  if (isLoggedIn) return <Navigate to="/" />;

  return <Outlet />;
};

export default PublicGuard;
