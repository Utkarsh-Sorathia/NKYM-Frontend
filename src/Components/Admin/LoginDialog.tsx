import { useState } from "react";
import axios from "axios";
import { Toast } from "../Toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const LoginDialog: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/admin/login`,
        { username: username, password: password },
      );
      if (response.data) {
        Toast.fire({
          icon: "success",
          title: "Logged in Successfully",
        });
        navigate("/admin/dashboard");
        localStorage.setItem("adminToken", response.data.token);
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
              <label className="block text-gray-700 mb-2" htmlFor="admin-username">
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-300"
                required
                autoFocus
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 mb-2" htmlFor="admin-password">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-amber-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                </button>
              </div>
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
