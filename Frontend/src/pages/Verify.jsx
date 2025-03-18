import { Outlet } from "react-router-dom";

export default function Verify() {
  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-gray-100">
        <Outlet />
    </div>
  );
}
