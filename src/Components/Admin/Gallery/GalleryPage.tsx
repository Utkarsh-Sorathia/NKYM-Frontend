import React, { useState } from "react";
import GalleryForm from "./GalleryForm";
import GalleryTable from "./GalleryTable";
import { FaImages, FaPlus } from "react-icons/fa";
import type { GalleryItem } from "./types";

const GalleryPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<GalleryItem | null>(null);
  const [reload, setReload] = useState(false);

  const handleAdd = () => {
    setEditItem(null);
    setShowForm(true);
  };

  const handleEdit = (item: GalleryItem) => {
    setEditItem(item);
    setShowForm(true);
  };

  const handleCloseForm = (refresh?: boolean) => {
    setShowForm(false);
    setEditItem(null);
    if (refresh) setReload(r => !r);
  };

  return (
    <section className="max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaImages className="mr-2 text-blue-500" /> Gallery Management
        </h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center shadow"
        >
          <FaPlus className="mr-2" /> Add New
        </button>
      </div>
      {showForm && (
        <GalleryForm
          onCancel={() => handleCloseForm(false)}
          onSuccess={() => handleCloseForm(true)}
          initialData={editItem}
        />
      )}
      <GalleryTable onEdit={handleEdit} reload={reload} />
    </section>
  );
};

export default GalleryPage;
