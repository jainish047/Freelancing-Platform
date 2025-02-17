import { Outlet } from "react-router-dom";
import {UserProvider} from "./context/userContext";
import "./index.css"

function App() {
  return (
    <>
      <UserProvider>
        <Outlet />
      </UserProvider>
    </>
  );
}

export default App;

