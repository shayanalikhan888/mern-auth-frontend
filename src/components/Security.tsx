
import { useNavigate } from "react-router-dom";
import { useUserSession } from "../libs/useUserSession";

const Security = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useUserSession();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Security Settings</h1>

      <div className="flex items-center justify-between bg-gray-50 border rounded-xl p-5 mb-4">
        <div>
          <h2 className="font-semibold text-gray-800">Email Verification</h2>
          <p className="text-sm text-gray-500">
            Verify your email address to secure your account
          </p>
        </div>

        {user?.isEmailVerified ? (
          <span className="px-4 py-2 rounded-lg bg-green-100 text-green-700 text-sm font-medium">
            ✔ Verified
          </span>
        ) : (
          <button
            onClick={() => navigate("/setup-email-verify")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition cursor-pointer"
          >
            Verify Email
          </button>
        )}
      </div>

      <div className="flex items-center justify-between bg-gray-50 border rounded-xl p-5">
        <div>
          <h2 className="font-semibold text-gray-800">
            Two-Factor Authentication (2FA)
          </h2>
          <p className="text-sm text-gray-500">
            Add an extra layer of security to your account
          </p>
        </div>

        {user?.twoFactorEnabled ? (
          <span className="px-4 py-2 rounded-lg bg-green-100 text-green-700 text-sm font-medium">
            ✔ Enabled
          </span>
        ) : (
          <button
            onClick={() => navigate("/setup-2fa")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition cursor-pointer"
          >
            Enable 2FA
          </button>
        )}
      </div>
    </div>
  );
};

export default Security;
