import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSave, FaTimes } from "react-icons/fa";
import type { EventItem } from "./EventsPage";

interface EventsFormProps {
  onCancel: () => void;
  onSuccess: () => void;
  initialData?: EventItem | null;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Converts "August 08, 2025" to "2025-08-08"
function parseDisplayDateToInput(dateStr: string): string {
  const parts = dateStr.match(/^([A-Za-z]+)\s(\d{2}),\s(\d{4})$/);
  if (!parts) return "";
  const month = (months.indexOf(parts[1]) + 1).toString().padStart(2, "0");
  return `${parts[3]}-${month}-${parts[2]}`;
}

// Converts "09:30 AM" to { time: "09:30", ampm: "AM" }
function parseDisplayTimeToInput(timeStr?: string): { time: string; ampm: "AM" | "PM" } {
  if (!timeStr) return { time: "", ampm: "AM" };
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s(AM|PM)$/);
  if (!match) return { time: "", ampm: "AM" };
  let hour = parseInt(match[1], 10);
  const minute = match[2];
  const ampm = match[3] as "AM" | "PM";
  if (ampm === "PM" && hour < 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;
  return { time: `${hour.toString().padStart(2, "0")}:${minute}`, ampm };
}

// Converts "2025-08-08" to "August 08, 2025"
function formatInputDateToDisplay(date: string): string {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  const monthName = months[parseInt(month, 10) - 1];
  return `${monthName} ${day.padStart(2, "0")}, ${year}`;
}

// Converts "14:30" + "PM" to "02:30 PM"
function formatInputTimeToDisplay(time: string, ampm: "AM" | "PM"): string {
  if (!time) return "";
  let [hour, minute] = time.split(":");
  let h = parseInt(hour, 10);
  let displayHour = h % 12 === 0 ? 12 : h % 12;
  return `${displayHour.toString().padStart(2, "0")}:${minute} ${ampm}`;
}

const EventsForm: React.FC<EventsFormProps> = ({
  onCancel,
  onSuccess,
  initialData,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [date, setDate] = useState(""); // input type="date" expects YYYY-MM-DD
  const [time, setTime] = useState(""); // input type="time" expects HH:MM (24h)
  const [ampm, setAMPM] = useState<"AM" | "PM">("AM");
  const [location, setLocation] = useState(initialData?.location || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Pre-fill date, time, and ampm for editing
  useEffect(() => {
    if (initialData?.date) {
      setDate(parseDisplayDateToInput(initialData.date));
    }
    if (initialData?.time) {
      const parsed = parseDisplayTimeToInput(initialData.time);
      setTime(parsed.time);
      setAMPM(parsed.ampm);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const formattedDate = formatInputDateToDisplay(date);
    const formattedTime = formatInputTimeToDisplay(time, ampm);

    try {
      if (initialData) {
        // Edit mode: PATCH or PUT
        await axios.put(
          `${import.meta.env.VITE_APP_BACKEND_URL}/events/${initialData.id}`,
          {
            title,
            date: formattedDate,
            time: formattedTime,
            location,
            description,
          }
        );
      } else {
        // Create mode: POST
        await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_URL}/events/create`,
          {
            title,
            date: formattedDate,
            time: formattedTime,
            location,
            description,
          }
        );
      }
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onSuccess();
      }, 1200);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to save event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg mb-8 p-6 max-w-xl mx-auto w-full animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {initialData ? "Edit Event" : "Add New Event"}
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
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter event title"
            required
            disabled={loading}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              AM/PM
            </label>
            <select
              value={ampm}
              onChange={e => setAMPM(e.target.value as "AM" | "PM")}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter event location"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter event description"
            required
            disabled={loading}
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && (
          <div className="text-green-600 text-sm">
            Event {initialData ? "updated" : "created"} successfully!
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

export default EventsForm;
