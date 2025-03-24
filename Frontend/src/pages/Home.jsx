import { Helmet } from "react-helmet-async";
import DashboardSidebar from "../components/DashboardSidebar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
export default function Home() {
  return (
    <div>
      <DashboardSidebar/>
      <Outlet/>
      <Footer/>
    </div>
  );
}
