import { Helmet } from "react-helmet-async";
import DashboardSidebar from "../components/DashboardSidebar";
import Footer from "../components/Footer";

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="flex flex-col w-full">
        <span className="text-9xl">This is Dashboard</span>
        <span className="text-9xl">This is Dashboard</span>
        <span className="text-9xl">This is Dashboard</span>
        <span className="text-9xl">This is Dashboard</span>
        <span className="text-9xl">This is Dashboard</span>
        <span className="text-9xl">This is Dashboard</span>
        <Footer/>
      </div>
    </>
  );
}
