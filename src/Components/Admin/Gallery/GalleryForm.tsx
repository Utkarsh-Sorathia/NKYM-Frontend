import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSave, FaTimes } from "react-icons/fa";
import type { GalleryItem } from "./types";

interface GalleryFormProps {
  onCancel: () => void;
  onSuccess: () => void;
  initialData?: GalleryItem | null;
}

const GalleryForm: React.FC<GalleryFormProps> = ({
  onCancel,
  onSuccess,
  initialData,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [_imageUrl, setImageUrl] = useState(initialData?.src || "");
  const [preview, setPreview] = useState(initialData?.src || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageFile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageUrl(""); // Clear previous url if new file selected
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Prepare form data for backend (which handles Cloudinary upload)
      const formData = new FormData();
      formData.append("name", name);
      if (imageFile) formData.append("image", imageFile); // backend expects 'image' field
      if (initialData) formData.append("id", initialData.id);

      // If editing, use PUT; if adding, use POST
      if (initialData) {
        await axios.put(
          `${import.meta.env.VITE_APP_BACKEND_URL}/gallery/${initialData.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_URL}/gallery/upload`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onSuccess();
      }, 1200);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to save gallery item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg mb-8 p-6 max-w-xl mx-auto w-full animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {initialData ? "Edit Gallery Item" : "Add New Gallery Item"}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-red-500 p-2"
          aria-label="Close"
          disabled={loading}
        >
          <FaTimes size={18} />
        </button>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter image name"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image Upload
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required={!initialData}
            disabled={loading}
          />
          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Preview"
                className="max-h-40 rounded-lg border mx-auto shadow"
              />
            </div>
          )}
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && (
          <div className="text-green-600 text-sm">
            Gallery item saved successfully!
          </div>
        )}
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
            disabled={loading}
          >
            <FaSave className="mr-2" /> {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GalleryForm;
