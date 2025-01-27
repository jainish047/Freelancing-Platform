import { resendVerificationEMail } from "../API/authentication";
import Button from "../components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function verifyWait() {
  // Extract email from query parameters
  // const queryParams = new URLSearchParams(window.location.search);
  // const email = queryParams.get("email");

  const location = useLocation();
  const { email } = location.state || {}; // Safely access state

  const navigate = useNavigate();

  const resendEmail = async() => {
    console.log("resending mail for: ", email);
    resendVerificationEMail(email)
      .then((responce)=>{
        console.log(responce.data.message)
        toast.success(responce.data.message);
      })
      .catch(()=>{
        console.log(error.responce.data.message)
        toast.error(error.response.data.message);
      })
  };

  return (
    <div className="flex justify-center items-center">
      <div className="mt-10 p-10 flex-col gap-2 justify-center items-center">
        <p>We have sent verification email to your email : {email}</p>
        <div className="my-3 flex gap-2">
          <button
            className="bg-gray-500 rounded w-full p-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400 hover:bg-gray-600 active:bg-gray-700 text-white"
            onClick={() => {
              navigate("/Login");
            }}
          >
            Login
          </button>
          <button
            className="bg-gray-500 rounded w-full p-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400 hover:bg-gray-600 active:bg-gray-700 text-white"
            onClick={resendEmail}
          >
            Resend Verification Email
          </button>
        </div>
      </div>
    </div>
  );
}
