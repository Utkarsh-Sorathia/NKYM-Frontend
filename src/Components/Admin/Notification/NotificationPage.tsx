import React, { useEffect, useState } from "react";
import { FaBell, FaPlus } from "react-icons/fa";
import CustomNotificationForm from "./NotificationForm";
import CustomNotificationTable from "./NotificationTable";
import axios from "axios";

const NotificationPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/notifications/logs`);
      setLogs(res.data.logs || []);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleCloseForm = (refresh?: boolean) => {
    setShowForm(false);
    if (refresh) fetchLogs();
  };

  return (
    <section className="max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaBell className="mr-2 text-blue-500" /> Notifications Management
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center shadow"
        >
          <FaPlus className="mr-2" /> Send New
        </button>
      </div>

      {showForm && (
        <CustomNotificationForm
          onCancel={() => handleCloseForm(false)}
          onSuccess={() => handleCloseForm(true)}
        />
      )}

      <CustomNotificationTable logs={logs} />
      {loading && <div className="text-blue-600 mt-4">Loading notifications...</div>}
    </section>
  );
};

export default NotificationPage;
