import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../libs/axios";
import { toast } from "react-toastify";
import { useUserSession } from "../libs/useUserSession";
import CatchError from "../libs/catchError";

const SetupVerifyEmail = () => {
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();
  const { mutate } = useUserSession();

  const handleResend = async () => {
    setResending(true);
    try {
      const { data } = await api.post("/auth/resend-verification");
      mutate();
      toast.success(data.message);
    } catch (err: any) {
      CatchError(err);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
        <p className="text-gray-600 mb-6">
          We have sent a verification link to your email. Please check your
          inbox and click the link to verify your account.
        </p>
        <button
          onClick={handleResend}
          disabled={resending}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 mb-4"
        >
          {resending ? "Resending..." : "Resend Email"}
        </button>
        <button
          onClick={() => navigate("/login")}
          className="w-full py-2 px-4 border border-gray-300 rounded hover:bg-gray-100"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default SetupVerifyEmail;
