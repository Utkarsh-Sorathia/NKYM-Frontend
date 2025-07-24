import React, { useEffect, useState } from "react";
import { FaPlus, FaRegWindowMaximize } from "react-icons/fa";
import PopupForm from "./PopupForm";
import PopupTable from "./PopupTable";
import axios from "axios";

const PopupPage: React.FC = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchPopups = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/popup-content`
      );
      setItems(res.data);
    } catch (error) {
      console.error("Failed to fetch popups", error);
    }
  };

  useEffect(() => {
    fetchPopups();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaRegWindowMaximize className="mr-2 text-blue-500" /> Popup Management
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center shadow"
        >
          <FaPlus className="mr-2" /> Add Popup
        </button>
      </div>

      {showForm && (
        <PopupForm
          onCancel={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            fetchPopups();
          }}
        />
      )}

      <PopupTable items={items} />
    </section>
  );
};

export default PopupPage;
