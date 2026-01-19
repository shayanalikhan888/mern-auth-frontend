import { useContext } from "react";
import UserContext from "../libs/context";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow">
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.username || "User"} 👋
        </h1>
        <p className="text-sm opacity-90 mt-1">
          Manage your account security and authentication settings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-1">
            Email Verification
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Protect your account by verifying your email
          </p>

          {user?.isEmailVerified ? (
            <span className="inline-block px-4 py-2 rounded-lg bg-green-100 text-green-700 text-sm font-medium">
              ✔ Email Verified
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

        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-1">
            Two-Factor Authentication
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Extra layer of security for your account
          </p>

          {user?.twoFactorEnabled ? (
            <span className="inline-block px-4 py-2 rounded-lg bg-green-100 text-green-700 text-sm font-medium">
              ✔ 2FA Enabled
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

      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h2 className="font-semibold text-gray-800 mb-4">
          Account Information
        </h2>

        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-medium">Email:</span>{" "}
            {user?.email || "Not available"}
          </p>
          <p>
            <span className="font-medium">Account Provider:</span>{" "}
            {user?.authProvider || "Local"}
          </p>
          <p>
            <span className="font-medium">Account Status:</span>{" "}
            <span className="text-green-600 font-medium">Active</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
