import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../libs/axios";
import { toast } from "react-toastify";
import { useUserSession } from "../libs/useUserSession";
import CatchError from "../libs/catchError";

const Setup2FA = () => {
  const [qrCode, setQrCode] = useState<string>("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrLoading, setQrLoading] = useState(true);
  const navigate = useNavigate();
  const { mutate } = useUserSession();

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        setQrLoading(true);
        const { data } = await api.post("/auth/setup-2fa");
        mutate();
        setQrCode(data.data.qrCodeDataURL);
      } catch (err: any) {
        CatchError(err);
      } finally {
        setQrLoading(false);
      }
    };

    fetchQRCode();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return toast.error("Please enter the 2FA code");

    setLoading(true);
    try {
      const { data } = await api.post("/auth/verify-2fa", { code });
      mutate();
      toast.success(data.message || "2FA enabled successfully!");
      navigate("/security");
    } catch (err: any) {
      CatchError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">
          Enable Two-Factor Authentication
        </h1>
        <p className="text-gray-600 mb-6">
          Scan the QR code in your authenticator app and enter the code below.
        </p>

        {qrLoading ? (
          <div className="mb-4 text-gray-500">Loading QR code...</div>
        ) : (
          qrCode && <img src={qrCode} alt="QR Code" className="mx-auto mb-4" />
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Enable 2FA"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Setup2FA;
