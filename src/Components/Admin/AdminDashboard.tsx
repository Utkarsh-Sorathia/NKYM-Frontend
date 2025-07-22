// src/components/admin/AdminDashboard.tsx
import { useState } from "react";
import Sidebar from "./SideBar";
import GalleryPage from "./Gallery/GalleryPage";
import EventsPage from "./Events/EventsPage";
import CustomNotificationPage from "./Notification/NotificationPage";

// Responsive Admin Dashboard Layout
const AdminDashboard: React.FC = () => {
  const [active, setActive] = useState<"gallery" | "events" | "notification">("gallery");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar active={active} onChange={setActive} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="w-full max-w-7xl mx-auto flex-1 p-4 sm:p-8 overflow-y-auto">
          {active === "gallery" ? <GalleryPage /> : (active === "events" ? <EventsPage /> : <CustomNotificationPage />)}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
