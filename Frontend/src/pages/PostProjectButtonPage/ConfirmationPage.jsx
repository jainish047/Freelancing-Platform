import React from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { FaLaptopCode } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

export default function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { projectName, description, budget, paymentMethod, skills, answers } = location.state || {};
  
  console.log("Received Data:", { projectName, description, budget, paymentMethod, skills, answers });

  const handlePostProject = () => {
    console.log("Project posted successfully!");
    alert("Project posted successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
        Are these details correct?
      </h2>
      
      <div className="flex items-center gap-6 border-b pb-6 mb-6 border-gray-300">
        {/* Left Side: Project Icon & Budget */}
        <div className="flex flex-col items-center border-r pr-6 border-gray-300 w-1/3">
          <FaLaptopCode className="text-blue-500 text-7xl mb-2" />
          <div className="text-gray-900 font-semibold text-lg">{budget || "Not specified"}</div>
        </div>
        
        {/* Right Side: Project Details */}
        <div className="flex-1 pl-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{projectName || "No project name"}</h3>
            <MdVerified className="text-green-500 text-3xl" />
          </div>
          <p className="text-gray-700 mb-4">{description || "No description"}</p>
          
          {/* Dynamic Answers */}
          {answers && answers.length > 0 && (
            <div className="bg-gray-100 p-4 rounded-md mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Additional Details:</h4>
              {answers.map((answers) => (
                <p key={answers} className="text-gray-700">{answers}</p>
              ))}
            </div>
          )}
          
          <div className="mb-3">
            <span className="font-semibold text-gray-900">Payment Method:</span>
            <p className="text-gray-700">{paymentMethod || "Not specified"}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills && skills.length > 0 ? (
              skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-500">No skills added</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Post Button */}
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="mt-6">
        <button
          onClick={handlePostProject}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-full"
        >
          Yes, post my project
        </button>
      </motion.div>
      
      {/* Footer */}
      <p className="text-center text-xs text-gray-500 mt-2">
        By clicking 'Yes, post my project', you agree to the {" "}
        <a href="#" className="text-blue-500 hover:underline">Terms & Conditions</a> and {" "}
        <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
      </p>
      <p className="text-center text-xs text-gray-500 mt-1">Copyright © 2025 P4 Freelancing Platform</p>
    </motion.div>
  );
}
