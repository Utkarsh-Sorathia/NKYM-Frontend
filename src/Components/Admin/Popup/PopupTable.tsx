import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaSave } from "react-icons/fa";
import axios from "axios";
import Modal from "../../Modal";
import { Toast } from "../../Toast";

interface PopupLog {
  id?: string;
  mediaUrl: string;
  mediaType: string;
  createdAt: { _seconds: number };
  isEnabled: boolean;
}

interface Props {
  items: PopupLog[];
}

const PopupTable: React.FC<Props> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PopupLog | null>(null);
  const [newStatus, setNewStatus] = useState<boolean | null>(null);

  const openModal = (item: PopupLog) => {
    setSelectedItem(item);
    setNewStatus(item.isEnabled);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedItem(null);
    setNewStatus(null);
  };

  const handleStatusChange = (status: boolean) => {
    setNewStatus(status);
  };

  const handleSave = async () => {

    if (!selectedItem?.id || newStatus === null) return;

    try {
      await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/popup-content/${selectedItem.id}`, {
        isEnabled: newStatus,
      });
      closeModal();
      Toast.fire({
        icon: "success",
        title: `Popup ${newStatus ? "enabled" : "disabled"} successfully!`,
      });
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Failed to update popup status. Please try again.",
      });
      console.error("Error updating popup status", err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto mt-8">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">Popup History</h3>
      </div>
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-gray-500">Media</th>
            <th className="px-6 py-3 text-left text-gray-500">Type</th>
            <th className="px-6 py-3 text-left text-gray-500">Created At</th>
            <th className="px-6 py-3 text-left text-gray-500">Enabled</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item, i) => (
            <tr key={i}>
              <td className="px-6 py-4">
                <a href={item.mediaUrl} className="text-blue-600 underline" target="_blank">
                  View Media
                </a>
              </td>
              <td className="px-6 py-4 capitalize">{item.mediaType}</td>
              <td className="px-6 py-4">
                {item.createdAt
                  ? new Date(item.createdAt._seconds * 1000).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      hour12: true,
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "-"}
              </td>
              <td
                className="px-6 py-4 cursor-pointer"
                onClick={() => openModal(item)}
              >
                {item.isEnabled ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaTimesCircle className="text-red-500" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="bg-white rounded-2xl shadow w-full max-w-lg mx-4 transform transition-all border border-gray-100 mx-auto">
          <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Update Popup Status</h2>
            <p className="text-sm text-gray-600">
              For popup media: <span className="font-semibold text-gray-900">{selectedItem?.mediaType}</span>
            </p>
          </div>

          <div className="p-8 space-y-5">
            {[true, false].map((status) => {
              const config = status
                ? {
                    title: "Enabled",
                    desc: "Popup will be visible to users",
                    color: "green",
                  }
                : {
                    title: "Disabled",
                    desc: "Popup will not be shown",
                    color: "red",
                  };

              return (
                <label
                  key={String(status)}
                  className={`block border-2 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:shadow ${
                    newStatus === status
                      ? `border-${config.color}-500 bg-${config.color}-50 text-${config.color}-700 shadow`
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="popupStatus"
                    value={String(status)}
                    checked={newStatus === status}
                    onChange={() => handleStatusChange(status)}
                    className="hidden"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{config.title}</h4>
                    <p className="text-sm text-gray-500">{config.desc}</p>
                  </div>
                </label>
              );
            })}
          </div>

          <div className="border-t border-gray-100 px-8 py-6 flex justify-end space-x-4 bg-gray-50 rounded-b-2xl">
            <button
              onClick={closeModal}
              className="px-7 py-3 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 border border-gray-200 shadow-sm transition-colors"
            >
              Cancel
            </button>
            <button
              className={`px-7 py-3 font-semibold rounded-xl transition-all shadow text-base border border-green-600 ${
                newStatus === null
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-200"
                  : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transform hover:scale-105"
              }`}
              onClick={handleSave}
              disabled={newStatus === null}
            >
              <FaSave className="inline mr-2 w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PopupTable;
