import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../libs/axios";
import { toast } from "react-toastify";
import { useUserSession } from "../libs/useUserSession";
import CatchError from "../libs/catchError";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate } = useUserSession();

  const [verified, setVerified] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = query.get("status");

    if (status) {
      if (status === "success") {
        setVerified(true);
        setMessage(
          "Your email is now verified! You can continue using the app."
        );
        toast.success("Email verified successfully!");
      } else if (status === "already") {
        setVerified(true);
        setMessage("Your email was already verified.");
        toast.info("Email already verified.");
      } else if (status === "failed") {
        setVerified(false);
        setMessage("Invalid or expired verification link.");
        toast.error("Invalid or expired verification link.");
      }
      setLoading(false);
    } else {
      const checkSession = async () => {
        try {
          const { data } = await api.get("/auth/session");
          setVerified(data.data.isEmailVerified);
          mutate();
          if (data.data.isEmailVerified) {
            setMessage("Your email is already verified.");
          } else {
            setMessage(
              "Your email is not verified yet. Please check your inbox or resend the verification email."
            );
          }
        } catch (err: any) {
          setVerified(false);
          setMessage("Failed to fetch session info.");
          CatchError(err);
        } finally {
          setLoading(false);
        }
      };
      checkSession();
    }
  }, [location.search]);

  const handleResend = async () => {
    setResending(true);
    try {
      const { data } = await api.post("/auth/resend-verification");
      toast.success(data.message || "Verification email resent successfully!");
      mutate();
      setMessage(
        "Verification email resent successfully! Please check your inbox."
      );
    } catch (err: any) {
      CatchError(err);
      setMessage("Failed to resend verification email. Try again later.");
    } finally {
      setResending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        <p className="text-gray-600 mb-6">{message}</p>

        {!verified && (
          <button
            onClick={handleResend}
            disabled={resending}
            className="w-full py-2 px-4 mb-4 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {resending ? "Resending..." : "Resend Verification Email"}
          </button>
        )}

        <button
          onClick={() => navigate("/")}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
