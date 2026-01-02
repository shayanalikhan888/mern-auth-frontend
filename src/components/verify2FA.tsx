import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../libs/axios";
import { useUserSession } from "../libs/useUserSession";
import CatchError from "../libs/catchError";

const Verify2FA = () => {
  const navigate = useNavigate();
  const { mutate } = useUserSession();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!code) {
      setError("Enter 2FA code");
      return;
    }

    const token = localStorage.getItem("temp2faToken");

    if (!token) {
      setError("no temp token found");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/2fa/verify", {
        code,
        token,
      });
      mutate();

      if (res.data.success) {
        navigate("/");
      }
    } catch (err: any) {
      CatchError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleVerify}
        className="bg-white p-6 rounded-xl shadow-md w-96"
      >
        <h2 className="text-xl font-semibold text-center mb-4">
          Two-Factor Authentication
        </h2>

        <input
          type="text"
          placeholder="Enter 6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-3"
        />

        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:opacity-90"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default Verify2FA;
