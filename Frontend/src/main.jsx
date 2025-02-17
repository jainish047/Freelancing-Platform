import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import App from './App.jsx'
import Signin from './pages/Signin.jsx'
import Login from './pages/Login.jsx'
import LandingPage from './pages/LandingPage.jsx'
import VerifyWait from './pages/VerifyWait.jsx'
import VerifyEmail from './pages/VerifyEmail.jsx'
import Newpage from './pages/NewPage.jsx'
// import Profile from './pages/Profile.jsx'

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:"",
        element: <LandingPage/>
      },{
        path:"Login",
        element: <Login/>
      },{
        path:"Signin",
        element:<Signin/>
      },{
        path:"WaitEmailVerify",
        element:<VerifyWait/>
      },{
        path: "verify-email",
        element:<VerifyEmail/>
      },
      {
        path: "Newpage",
        element:<Newpage/>
      },
      // {
      //   path: "Profile",
      //   element:<Profile/>
      // }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router}/>
  </StrictMode>,
)