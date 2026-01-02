import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../libs/axios";
import UserContext from "../libs/context";

const AuthGuard = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        await new Promise((res) => setTimeout(res, 50));
        await api.get("/auth/refresh-token").catch(() => {});
        const { data } = await api.get("/auth/session");
        setUser(data.data);
        if (isMounted) setAuthenticated(true);
      } catch (err) {
        if (isMounted) setAuthenticated(false);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!authenticated) return <Navigate to="/login" />;

  return <Outlet />;
};

export default AuthGuard;
