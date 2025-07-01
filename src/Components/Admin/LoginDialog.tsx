import { useState } from "react";
import axios from "axios";

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
      // Use POST and send the adminKey in the body
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/verify-admin`,
        { adminKey: key }
      );

      if (response.data.valid) {
        onSuccess();
      } else {
        setError("Invalid admin key");
      }
    } catch (err) {
      setError("Error verifying admin key");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Admin Key</label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginDialog;
