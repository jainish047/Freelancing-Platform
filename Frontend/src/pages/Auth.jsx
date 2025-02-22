import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

export default function Auth() {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}
