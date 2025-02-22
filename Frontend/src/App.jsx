import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { useEffect } from "react";
import Header from "./components/Header";
import { fetchUserDetails } from "./context/authSlice";
import { setAuthToken } from "./API/axiosConfig";
// import { Toaster } from "@/components/ui/toaster";
import { Toaster } from "./components/ui/toaster";

function App() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  // Although dispatch is stable, ESLint's react-hooks/exhaustive-deps rule suggests adding it:

  // In some cases, dispatch might be recreated by Redux with a different reference (e.g., if using a custom store enhancer).
  // Adding dispatch ensures that if its reference changes, the effect re-runs.
  // Prevents potential issues in complex setups.

  useEffect(() => {
    // const token = localStorage.getItem("authToken");
    // Only fetch if token exists and the current path is not login or signup
    if (token && !["/auth/login", "/auth/signup"].includes(location.pathname)) {
      setAuthToken(token); // ✅ Set token in Axios headers
      dispatch(fetchUserDetails());
    }
    // console.log("user->", user)
    console.log("token->", token);
  }, [dispatch, location.pathname]);

  useEffect(() => {
    if (user) {
      console.log("user->", user); // Now only log user after it's fetched
    }
  }, [user]);

  return (
    <div className="w-screen h-screen">
      <Header />
      <Outlet />
      <Toaster />
    </div>
  );
}

export default App;
