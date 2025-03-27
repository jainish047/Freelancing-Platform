import { useState } from "react";
import { Home, Briefcase, List, ClipboardList, Bell } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-full w-full p-4 bg-white text-gray-700 flex flex-col items-center border-r shadow-sm">
      <nav className="space-y-6 text-gray-500 text-center">
        <div
          className="flex flex-col items-center"
          onClick={() => navigate("/")}
        >
          <Home
            className={`w-6 h-6 ${
              location.pathname === "" ? "text-blue-500" : "text-gray-500"
            }`}
          />
          <span className="text-xs mt-1">Home</span>
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => navigate("/lists")}
        >
          <List
            className={`w-6 h-6 ${
              location.pathname === "lists" ? "text-blue-500" : "text-gray-500"
            }`}
          />
          <span className="text-xs mt-1">Lists</span>
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => navigate("/projects")}
        >
          <Briefcase
            className={`w-6 h-6 ${
              location.pathname === "projects"
                ? "text-blue-500"
                : "text-gray-500"
            }`}
          />
          <span className="text-xs mt-1">Projects</span>
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => navigate("/projectUpdates")}
        >
          <ClipboardList
            className={`w-6 h-6 ${
              location.pathname === "projectUpdates"
                ? "text-blue-500"
                : "text-gray-500"
            }`}
          />
          <span className="text-xs mt-1">Updates</span>
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => navigate("/notification")}
        >
          <Bell
            className={`w-6 h-6 ${
              location.pathname === "notification"
                ? "text-blue-500"
                : "text-gray-500"
            }`}
          />
          <span className="text-xs mt-1">Notifications</span>
        </div>
      </nav>
    </div>
  );
}
