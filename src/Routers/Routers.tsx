import { Route, Routes } from "react-router-dom";
import NotFound from "../Components/NotFound";
import AdminDashboard from "../Components/Admin/AdminDashboard";
import MainLayout from "../Components/MainLayout";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Routers;
