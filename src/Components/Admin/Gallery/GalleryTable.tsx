import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { GalleryItem } from "./types";
import Swal from "sweetalert2";
import { Toast } from "../../Toast";

interface GalleryTableProps {
  onEdit: (item: GalleryItem) => void;
  reload: boolean;
}

const GalleryTable: React.FC<GalleryTableProps> = ({ onEdit, reload }) => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/gallery/all`
      );
      setItems(response.data.gallery); // backend must return gallery array with id fields
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGallery();
    // eslint-disable-next-line
  }, [reload]);

  const handleDelete = async (id: string, name: string) => {
    Swal.fire({
      title: `Are you sure you want to delete this item : ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${import.meta.env.VITE_APP_BACKEND_URL}/gallery/${id}`
          );
          Toast.fire({
            icon: "success",
            title: `Item ${name} deleted successfully!`,
          });
          fetchGallery(); // Refresh the gallery after deletion
        } catch (error) {
          console.error("Error deleting item:", error);
          Toast.fire({
            icon: "error",
            title: `Failed to delete item ${name}. Please try again.`,
          });
        }
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-b gap-4">
        <h3 className="text-lg font-medium text-gray-900">Gallery Items</h3>
      </div>
      {loading ? (
        <div className="p-8 text-center text-blue-600">Loading gallery...</div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Preview</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Uploaded</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map(item => (
              <tr key={item.id}>
                <td className="px-6 py-4">
                  <img
                    src={item.src}
                    alt={item.name}
                    className="h-12 w-12 rounded-lg object-cover shadow"
                  />
                </td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{new Date(item.uploaded).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <button
                    className="text-blue-600 hover:text-blue-900 mr-3 p-2 rounded hover:bg-blue-50 transition"
                    onClick={() => onEdit(item)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50 transition"
                    onClick={() => handleDelete(item.id, item.name)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GalleryTable;
