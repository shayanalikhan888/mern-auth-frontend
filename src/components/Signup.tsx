import { useState } from "react";
import api from "../libs/axios";
import CatchError from "../libs/catchError";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    dob: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.email ||
      !formData.mobile ||
      !formData.password ||
      !formData.dob
    ) {
      toast.warn("all fields are required");
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.post("/auth/signup", formData);
      toast.success(data.message);
    } catch (err) {
      CatchError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="p-3 border mb-3 border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-3 border mb-3 border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          className="p-3 border mb-3 border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="p-3 border mb-3 border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
        />

        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full mb-5 px-4 py-2 border border-rose-500 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-rose-600 cursor-pointer text-white py-3 rounded-md w-full hover:bg-rose-700 transition font-medium"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <p className="text-center mt-3">
          already have an account?{" "}
          <Link className="text-rose-700 font-medium" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
