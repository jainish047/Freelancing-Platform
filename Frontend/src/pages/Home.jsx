import { Helmet } from "react-helmet-async";
import DashboardSidebar from "../components/DashboardSidebar";
import { Outlet } from "react-router-dom";
export default function Home() {
  return (
    <div>
      <DashboardSidebar/>
      <Outlet/>
    </div>
  );
}
