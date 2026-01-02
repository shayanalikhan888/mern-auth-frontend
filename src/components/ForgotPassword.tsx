import { useState } from "react";
import api from "../libs/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CatchError from "../libs/catchError";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage("");

      const { data } = await api.post("/auth/forget-password", { email });
      setMessage(data.message || "Password reset email sent");
      toast.success("Password reset email sent");
    } catch (err: any) {
      setMessage(err?.response?.data?.message || err.message);
      CatchError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-lg p-6 space-y-5 w-full max-w-md rounded-xl">
        <h1 className="text-3xl font-bold text-center">Forgot Password</h1>

        <p className="text-sm text-gray-500 text-center">
          Enter your email and we’ll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="p-3 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-rose-600 cursor-pointer text-white py-3 rounded-md w-full hover:bg-rose-700 transition font-medium disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <p className="text-sm text-center text-gray-700">{message}</p>
        )}

        <button
          onClick={() => navigate("/login")}
          className="text-sm text-rose-600 hover:underline text-center w-full"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
