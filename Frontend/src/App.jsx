import { Outlet } from "react-router-dom";
import {UserProvider} from "./context/userContext";

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
