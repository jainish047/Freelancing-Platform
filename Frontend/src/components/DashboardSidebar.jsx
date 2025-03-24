import { useState } from "react";
import { Home, Folder, List, ClipboardList, Bell } from "lucide-react";


export default function DashboardSidebar(){
    const [activeMenu, setActiveMenu] = useState("Home");

  return (
    <div className="flex flex-1">
      {/* Left Sidebar 1  */}
      <div className="w-24 bg-white text-gray-700 p-4 flex flex-col items-center border-r shadow-sm min-h-screen">
        <nav className="space-y-6 text-gray-500 text-center">
          <div className="flex flex-col items-center" onClick={() => setActiveMenu("Home")}> 
            <Home className={`w-6 h-6 ${activeMenu === "Home" ? "text-blue-500" : "text-gray-500"}`} />
            <span className="text-xs mt-1">Home</span>
          </div>
          <div className="flex flex-col items-center" onClick={() => setActiveMenu("Folder")}> 
            <Folder className={`w-6 h-6 ${activeMenu === "Folder" ? "text-blue-500" : "text-gray-500"}`} />
            <span className="text-xs mt-1">Projects</span>
          </div>
          <div className="flex flex-col items-center" onClick={() => setActiveMenu("List")}> 
            <List className={`w-6 h-6 ${activeMenu === "List" ? "text-blue-500" : "text-gray-500"}`} />
            <span className="text-xs mt-1">Lists</span>
          </div>
          <div className="flex flex-col items-center" onClick={() => setActiveMenu("ClipboardList")}> 
            <ClipboardList className={`w-6 h-6 ${activeMenu === "ClipboardList" ? "text-blue-500" : "text-gray-500"}`} />
            <span className="text-xs mt-1">Updates</span>
          </div>
          <div className="flex flex-col items-center" onClick={() => setActiveMenu("Bell")}> 
            <Bell className={`w-6 h-6 ${activeMenu === "Bell" ? "text-blue-500" : "text-gray-500"}`} />
            <span className="text-xs mt-1">Notifications</span>
          </div>
        </nav>
      </div>
    </div>
  );
}