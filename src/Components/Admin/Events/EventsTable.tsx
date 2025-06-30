import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import type { EventItem } from "./EventsPage";
import { Toast } from "../../Toast";
import Swal from "sweetalert2";

interface EventsTableProps {
  onEdit: (event: EventItem) => void;
  reload: boolean;
}

const EventsTable: React.FC<EventsTableProps> = ({ onEdit, reload }) => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/events/all`
      );
      setEvents(response.data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line
  }, [reload]);

  // Delete event handler
  const handleDelete = async (id: string, event: string) => {
    Swal.fire({
      title: `Are you sure you want to delete this event : ${event}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${import.meta.env.VITE_APP_BACKEND_URL}/events/${id}`
          );
          Toast.fire({
            icon: "success",
            title: "Event deleted successfully",
          });
          fetchEvents(); // Refresh the events list
        } catch (error) {
          console.error("Error deleting event:", error);
          Toast.fire({
            icon: "error",
            title: "Failed to delete event",
          });
        }
      }
    })
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-b gap-4">
        <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
      </div>
      {loading ? (
        <div className="p-8 text-center text-blue-600">Loading events...</div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                Title
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                Location
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">{item.date}</td>
                <td className="px-6 py-4">{item.location}</td>
                <td className="px-6 py-4">
                  <button
                    className="text-blue-600 hover:text-blue-900 mr-3 p-2 rounded hover:bg-blue-50 transition"
                    onClick={() => onEdit(item)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50 transition"
                    onClick={() => handleDelete(item.id, item.title)}
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

export default EventsTable;
