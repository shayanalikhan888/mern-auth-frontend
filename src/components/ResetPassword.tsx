import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../libs/axios";
import { toast } from "react-toastify";
import CatchError from "../libs/catchError";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const urlToken = new URLSearchParams(location.search).get("token");
    setToken(urlToken);
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Token missing, cannot reset password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/reset-password", {
        token,
        newPassword,
        confirmPassword,
      });

      toast.success(data.message || "Password reset successful");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      CatchError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-lg p-6 space-y-5 w-full max-w-md rounded-xl">
        <h1 className="text-3xl font-bold text-center">Reset Password</h1>

        <p className="text-sm text-gray-500 text-center">
          Enter your new password below to reset your account password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="p-3 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
          />

          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="p-3 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-rose-600 text-white py-3 rounded-md w-full hover:bg-rose-700 transition font-medium disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

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

export default ResetPassword;
