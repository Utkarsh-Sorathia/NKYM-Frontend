import React, { useState } from "react";
import EventsForm from "./EventsForm";
import EventsTable from "./EventsTable";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  description?: string;
}

const EventsPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editEvent, setEditEvent] = useState<EventItem | null>(null);
  const [reload, setReload] = useState(false);

  // Open form for editing
  const handleEdit = (event: EventItem) => {
    setEditEvent(event);
    setShowForm(true);
  };

  // Open form for adding new
  const handleAdd = () => {
    setEditEvent(null);
    setShowForm(true);
  };

  // After submit or cancel, close form and optionally reload table
  const handleCloseForm = (refresh?: boolean) => {
    setShowForm(false);
    setEditEvent(null);
    if (refresh) setReload((r) => !r);
  };

  return (
    <section className="max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaCalendarAlt className="mr-2 text-blue-500" /> Events Management
        </h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center shadow"
        >
          <FaPlus className="mr-2" /> Add New
        </button>
      </div>
      {showForm && (
        <EventsForm
          onCancel={() => handleCloseForm(false)}
          onSuccess={() => handleCloseForm(true)}
          initialData={editEvent}
        />
      )}
      <EventsTable onEdit={handleEdit} reload={reload} />
    </section>
  );
};

export default EventsPage;
