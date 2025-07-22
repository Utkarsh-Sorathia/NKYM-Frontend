import { Route, Routes } from "react-router-dom";
import NotFound from "../Components/NotFound";
import AdminDashboard from "../Components/Admin/AdminDashboard";
import MainLayout from "../Components/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import LoginDialog from "../Components/Admin/LoginDialog";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/admin/login" element={<LoginDialog />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Routers;
