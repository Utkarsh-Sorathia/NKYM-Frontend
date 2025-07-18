import React, { useState } from "react";
import axios from "axios";
import { FaSave, FaTimes } from "react-icons/fa";

interface Props {
  onCancel: () => void;
  onSuccess: () => void;
}

const NotificationForm: React.FC<Props> = ({ onCancel, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [icon, setIcon] = useState("/icon.png");
  const [link, setLink] = useState("https://nkym.vercel.app/#events");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/notifications/send-custom`, {
        title,
        body,
        icon,
        data: { click_action: link },
      });

      if (res.data.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onSuccess();
        }, 1500);
      } else {
        setError(res.data.error || "Failed to send notification.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Create New Notification
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-red-500 p-2"
          aria-label="Close"
        >
          <FaTimes size={18} />
        </button>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title *</label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Enter notification title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message *</label>
          <textarea
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Enter message to send"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            disabled={loading}
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Icon URL</label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2"
            placeholder="/favicon.ico"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Click Link</label>
          <input
            type="url"
            className="w-full border rounded-lg px-4 py-2"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            disabled={loading}
          />
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">Notification sent successfully!</div>}

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            disabled={loading || !title || !body}
          >
            <FaSave className="mr-2" />
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotificationForm;
