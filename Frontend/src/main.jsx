// import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./context/store";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import VerifyWait from "./pages/VerifyWait.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import Auth from "./pages/Auth.jsx";
import Profile from "./pages/Profile.jsx";
import Explore from "./pages/Explore.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ExploreFreelancers from "./pages/ExploreFreelancers.jsx";
import ExploreProjects from "./pages/ExploreProjects.jsx";
import Verify from "./pages/Verify.jsx";
import Home from "./pages/Home.jsx";
import Lists from "./pages/List.jsx";
import Projects from "./pages/Projects.jsx";
import Notification from "./pages/Notification.jsx";
import ProjectUpdates from "./pages/ProjectUpdates.jsx";

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
        element: <Signup />,
      },
    ],
  },
  {
    path: "verify",
    element: <Verify />,
    children: [
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
        element: <Home />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "lists",
            element: <Lists />,
          },
          {
            path: "projects",
            element: <Projects />,
          },
          {
            path: "projectupdates",
            element: <ProjectUpdates />,
          },
          {
            path: "notifications",
            element: <Notification />,
          },
        ],
      },
      {
        path: "explore",
        element: <Explore />,
        children: [
          {
            path: "freelancers",
            element: <ExploreFreelancers />,
          },
          {
            path: "projects",
            element: <ExploreProjects />,
          },
        ],
      },
      {
        path: "Profile/:id",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={Router} />
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
