import { Link } from "react-router-dom";
import { useUser } from "../context/userContext";

export default function LandingPageHeader() {
  const { user } = useUser();
  return (
    <header className="flex justify-between items-center p-2 bg-gray-600 text-white">
      <h1 className="font-bold text-2xl">P4</h1>
      {localStorage.getItem("token") && user ? (
        <p>{user.fname || user.email}</p>
      ) : (
        <div className="flex">
          <Link to="/login" className="underline">
            Login{" "}
          </Link>
          <p className="mx-1">|</p>
          <Link to="/signin" className="underline">
            {" "}
            Signin
          </Link>
          <p className="mx-1">|</p>
          <Link to="/Newpage" className="underline">
            {" "}
            Newpage
          </Link>
        </div>
      )}
    </header>
  );
}
