import React, { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import axios from "axios";

interface Props {
  onCancel: () => void;
  onSuccess: () => void;
}

const PopupForm: React.FC<Props> = ({ onCancel, onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState("image");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload a media file.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("mediaType", mediaType);
      formData.append("isEnabled", "true");

      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/popup-content`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onSuccess();
      }, 1000);
    } catch (err) {
      setError("Failed to create popup");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const isVideo = selected.type.startsWith("video/");
      setMediaType(isVideo ? "video" : "image");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Create Popup</h3>
        <button onClick={onCancel} className="text-gray-400 hover:text-red-500 p-2">
          <FaTimes size={18} />
        </button>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Media</label>
          <input
            type="file"
            accept="image/*,video/*"
            className="w-full border rounded-lg px-4 py-2"
            onChange={handleFileChange}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Media Type</label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2 bg-gray-100"
            value={mediaType}
            disabled
          />
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">Popup created!</div>}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            disabled={loading}
          >
            <FaSave className="mr-2" /> {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PopupForm;
