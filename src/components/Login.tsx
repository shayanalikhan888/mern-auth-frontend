import { useState } from "react";
import api from "../libs/axios";
import { Link, useNavigate } from "react-router-dom";
import CatchError from "../libs/catchError";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "shayan@gmail.com",
    password: "linehack",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data: res } = await api.post("/auth/login", data);
      if (res.data.twoFactorRequired) {
        localStorage.setItem("temp2faToken", res.data.token);
        return navigate("/2fa");
      }
      await new Promise((resolve) => setTimeout(resolve, 50));
      navigate("/");
    } catch (err: any) {
      CatchError(err);
    }
  };

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleLogin = async () => {
    try {
      const { data } = await api.get("/auth/login/google");
      const url = data.data;
      window.location.href = url;
    } catch (err: any) {
      CatchError(err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-lg p-6 space-y-5 w-full max-w-md rounded-xl">
        <h1 className="text-3xl font-bold text-center">Welcome Back</h1>

        <button
          onClick={handleGoogleLogin}
          className="cursor-pointer flex items-center justify-center gap-3 w-full border border-gray-300 py-3 rounded-md hover:bg-gray-100 transition font-medium"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            required
            value={data.email}
            onChange={handleChange}
            className="p-3 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="Enter your email"
          />

          <input
            type="password"
            name="password"
            required
            value={data.password}
            onChange={handleChange}
            className="p-3 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="Enter your password"
          />

          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-rose-600 cursor-pointer hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="bg-rose-600 cursor-pointer text-white py-3 rounded-md w-full hover:bg-rose-700 transition font-medium"
          >
            Login
          </button>
          <p className="text-center mt-2">
            dont't have an account?{" "}
            <Link className="text-rose-500 font-medium" to="/signup">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
