import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./context/store";
import { Provider } from "react-redux";

import App from "./App.jsx";
import Signin from "./pages/Signin.jsx";
import Login from "./pages/Login.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import VerifyWait from "./pages/VerifyWait.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import Newpage from "./pages/NewPage.jsx";
import Auth from "./pages/Auth.jsx";
// import Profile from './pages/Profile.jsx'

const Router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signin />,
      },
      {
        path: "waitEmailVerify",
        element: <VerifyWait />,
      },
      {
        path: "verify-email",
        element: <VerifyEmail />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "Newpage",
        element: <Newpage />,
      },
      // {
      //   path: "Profile",
      //   element:<Profile/>
      // }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  </StrictMode>
);
