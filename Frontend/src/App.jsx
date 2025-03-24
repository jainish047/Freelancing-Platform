import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { useEffect } from "react";
import Header from "./components/Header";
import { fetchUserDetails, setToken } from "./context/authSlice";
import { setAuthToken } from "./API/axiosConfig";
import { Toaster } from "./components/ui/toaster";
import { getCountries, getSkills } from "./context/generalSlice";
import { getToken } from "./API/authentication";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const storeToken = async () => {
      let token = localStorage.getItem("authToken") || (await getToken());

      if (
        token &&
        !["/auth/login", "/auth/signup"].includes(location.pathname)
      ) {
        setAuthToken(token);
        dispatch(setToken(token));
        dispatch(fetchUserDetails());
      }

      console.log("token->", token);
    };

    storeToken();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      console.log("user->", user);
    }
  }, [user]);

  useEffect(() => {
    dispatch(getSkills());
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className="border w-screen h-screen flex flex-col">
      <Header />
      <Outlet />
      <Toaster />
    </div>
  );
}

export default App;
