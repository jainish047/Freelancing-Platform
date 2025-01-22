import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Signin from './Signin.jsx'
import Login from './Login.jsx'
import LandingPage from './LandingPage.jsx'

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:"/",
        element: <LandingPage/>
      },{
        path:"/Login",
        element: <Login/>
      },{
        path:"Signin",
        element:<Signin/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router}/>
  </StrictMode>,
)
