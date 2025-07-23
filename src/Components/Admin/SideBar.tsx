// src/components/admin/Sidebar.tsx
import { FaImages, FaCalendarAlt, FaUser, FaBars, FaTimes, FaBell, FaSignOutAlt, FaRegWindowMaximize } from "react-icons/fa";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  active: "gallery" | "events" | "notification" | "popup";
  onChange: (section: "gallery" | "events" | "notification" | "popup") => void;
}

const Sidebar: React.FC<SidebarProps> = ({ active, onChange }) => {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigate = useNavigate();

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
          className={`flex items-center px-6 py-3 w-full text-left hover:bg-blue-50 transition ${active === "gallery" ? "bg-blue-50 border-l-4 border-blue-500" : ""
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
          className={`flex items-center px-6 py-3 w-full text-left hover:bg-blue-50 transition ${active === "events" ? "bg-blue-50 border-l-4 border-blue-500" : ""
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
          className={`flex items-center px-6 py-3 w-full text-left hover:bg-blue-50 transition ${active === "notification" ? "bg-blue-50 border-l-4 border-blue-500" : ""
            }`}
          onClick={() => {
            onChange("notification");
            setOpen(false);
          }}
        >
          <FaBell className="mr-3 text-blue-500" />
          Notifications
        </button>
        <button
          className={`flex items-center px-6 py-3 w-full text-left hover:bg-blue-50 transition ${active === "popup" ? "bg-blue-50 border-l-4 border-blue-500" : ""
            }`}
          onClick={() => {
            onChange("popup");
            setOpen(false);
          }}
        >
          <FaRegWindowMaximize className="mr-3 text-blue-500" />
          Pop up
        </button>
      </nav>
      {/* User Profile with popper */}
      <div className="relative border-t px-6 py-4 mt-auto">
        <button
          className="flex items-center justify-between w-full group"
          onClick={() => setUserMenuOpen((prev) => !prev)}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">
              <FaUser className="text-blue-500" size={20} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-gray-800">Utkarsh Sorathia</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </div>
          <FaChevronDown
            className={`transition-transform duration-200 text-gray-500 ${userMenuOpen ? "rotate-180" : ""
              }`}
          />
        </button>

        {/* Dropdown/popup */}
        {userMenuOpen && (
          <div className="absolute bottom-16 left-6 bg-white border rounded shadow-lg w-52 z-50">
            <div className="p-4">
              <p className="text-sm font-medium text-gray-800">Utkarsh Sorathia</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("adminToken");
                navigate("/");
              }}
              className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 w-full text-sm border-t"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        )}
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
