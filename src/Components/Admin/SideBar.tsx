// src/components/admin/Sidebar.tsx
import { FaImages, FaCalendarAlt, FaUser, FaBars, FaTimes, FaBell } from "react-icons/fa";
import React, { useState } from "react";

interface SidebarProps {
  active: "gallery" | "events" | "notification";
  onChange: (section: "gallery" | "events" | "notification") => void;
}

const Sidebar: React.FC<SidebarProps> = ({ active, onChange }) => {
  const [open, setOpen] = useState(false);

  // Sidebar content as a separate variable for reuse
  const sidebarContent = (
    <>
      <div className="p-4 border-b flex items-center">
        <img src="/icon.png" alt="Ganesha Idol" className="w-16 h-16" />
        <span className="text-2xl font-bold text-blue-600">Admin Panel</span>
      </div>
      <nav className="mt-6 flex-1">
        <div className="px-4 py-2">
          <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Management</h3>
        </div>
        <button
          className={`flex items-center px-6 py-3 w-full text-left hover:bg-blue-50 transition ${
            active === "gallery" ? "bg-blue-50 border-l-4 border-blue-500" : ""
          }`}
          onClick={() => {
            onChange("gallery");
            setOpen(false);
          }}
        >
          <FaImages className="mr-3 text-blue-500" />
          Gallery
        </button>
        <button
          className={`flex items-center px-6 py-3 w-full text-left hover:bg-blue-50 transition ${
            active === "events" ? "bg-blue-50 border-l-4 border-blue-500" : ""
          }`}
          onClick={() => {
            onChange("events");
            setOpen(false);
          }}
        >
          <FaCalendarAlt className="mr-3 text-blue-500" />
          Events
        </button>
        <button
          className={`flex items-center px-6 py-3 w-full text-left hover:bg-blue-50 transition ${
            active === "notification" ? "bg-blue-50 border-l-4 border-blue-500" : ""
          }`}
          onClick={() => {
            onChange("notification");
            setOpen(false);
          }}
        >
          <FaBell className="mr-3 text-blue-500" />
          Notifications
        </button>
      </nav>
      <div className="p-4 border-t flex items-center">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <FaUser className="text-blue-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700">Utkarsh Sorathia / Admin</p>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 bg-white p-2 rounded shadow"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <FaBars size={22} />
      </button>

      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Sidebar overlay for mobile */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-40"
            onClick={() => setOpen(false)}
          ></div>
          {/* Sidebar */}
          <aside className="relative z-50 w-64 bg-white shadow-lg h-full flex flex-col animate-slideIn">
            <button
              className="absolute top-5 right-4 text-gray-700"
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
            >
              <FaTimes size={22} />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
