import { useState } from "react";
import axios from "axios";
import { Toast } from "../Toast";

type LoginDialogProps = {
  onSuccess: () => void;
};

const LoginDialog: React.FC<LoginDialogProps> = ({ onSuccess }) => {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/verify-admin`,
        { adminKey: key }
      );

      if (response.data.valid) {
        onSuccess();
        Toast.fire({
          icon: "success",
          title: "Logged in Successfully",
        });
      } else {
        setError("Invalid admin key");
      }
    } catch (err) {
      setError("Error verifying admin key");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md lg:max-w-2xl mx-4 border border-amber-100 shadow-lg shadow-amber-300 flex flex-col lg:flex-row items-center">
        {/* Icon on top for mobile, left for desktop */}
        <div className="flex-shrink-0 flex justify-center items-center mb-4 lg:mb-0 lg:mr-8">
          <img src="/icon.png" alt="idol" className="h-72 w-72" style={{ objectFit: "contain" }} />
        </div>
        {/* Form */}
        <div className="flex flex-col items-center w-full">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Admin Login</h2>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="admin-key">
                Admin Key
              </label>
              <input
                id="admin-key"
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-300"
                required
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginDialog;
