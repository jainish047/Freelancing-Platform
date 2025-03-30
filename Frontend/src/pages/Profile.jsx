import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaStar,
  FaTrophy,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaLinkedin,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../API/user";

const ExpandableSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-3 text-lg font-semibold text-gray-700 hover:text-blue-600"
      >
        {title}
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isOpen && <div className="p-3 text-gray-600">{children}</div>}
    </div>
  );
};

const Profile = () => {
  // const user = useSelector((state) => state.auth.user);
  const [userDetails, setUserDetails] = useState(null);
  const id = useParams().id;
  const countries = useSelector((state) => state.general.countries);

  useEffect(() => {
    async function getProfile() {
      const responce = await getUserDetails(id);
      console.log("profile got: ", responce);
      setUserDetails(responce.data);
    }
    getProfile();
  }, []);

  if (!userDetails) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section - Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Header */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col lg:flex-row items-center lg:items-start gap-6 border border-purple-200">
            <img
              src={userDetails.profilePic}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-blue-700">
                {userDetails.name || "User"}
              </h2>
              <p className="text-gray-500">Professional Title</p>
              <p className="text-sm text-gray-400 flex items-center gap-1">
                <FaMapMarkerAlt className="text-gray-400" /> {userDetails.location || "Location"}
              </p>
              <p className="text-gray-400 flex items-center gap-1">
                {/* {userDetails.country} */}
              {userDetails.country && (countries.find(country => country.id == userDetails.country)?.name)}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-yellow-500 text-xl flex items-center gap-1">
                <FaStar className="text-yellow-500" /> {userDetails.rating || "-"}
              </p>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <FaTrophy className="text-green-600" /> Top Rated
              </span>
            </div>
          </div>

          {/* Overview Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-bold">Overview</h3>
            <p className="text-gray-600 text-justify mt-4">
              {userDetails.bio || "No bio available."}
            </p>
          </div>

          {/* Work History and Feedback */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Work history and feedback</h3>
            <div className="mt-4 space-y-4">
              {/* E-commerce Website Feedback */}
              <div className="p-4 bg-gray-100 rounded-lg">
                <h4 className="font-semibold">
                  E-commerce Website{" "}
                  <span className="text-gray-500 text-sm">- Mar 2021</span>
                </h4>
                <p className="text-yellow-500 flex items-center gap-1">
                  <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                </p>
                <p className="text-gray-600 mt-2">
                  Developed a high-performance e-commerce platform with seamless
                  checkout and responsive design.
                </p>
                <div className="flex gap-2 mt-2">
                  <img
                    src="https://via.placeholder.com/80"
                    alt="Project"
                    className="w-20 h-20 rounded-md"
                  />
                  <img
                    src="https://via.placeholder.com/80"
                    alt="Project"
                    className="w-20 h-20 rounded-md"
                  />
                  <img
                    src="https://via.placeholder.com/80"
                    alt="Project"
                    className="w-20 h-20 rounded-md"
                  />
                </div>
              </div>

              {/* Import-Export Website Feedback */}
              <div className="p-4 bg-gray-100 rounded-lg">
                <h4 className="font-semibold">
                  Import-Export Website{" "}
                  <span className="text-gray-500 text-sm">- Feb 2021</span>
                </h4>
                <p className="text-yellow-500 flex items-center gap-1">
                  <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                </p>
                <p className="text-gray-600 mt-2">
                  Designed and built a scalable platform for import-export
                  businesses to manage logistics and transactions efficiently.
                </p>
              </div>
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
              Show all feedback
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Rating & Message Box */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="font-semibold text-center">Message</h4>
            <div className="text-center my-2">
              <p className="text-yellow-500 text-xl flex items-center justify-center gap-1">
                <FaStar /> 4.8
              </p>
            </div>
            <button className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg">
              Send Message
            </button>
            <div className="flex justify-center gap-4 mt-3 text-gray-600">
              <FaEnvelope className="cursor-pointer hover:text-blue-500" />
              <FaLinkedin className="cursor-pointer hover:text-blue-700" />
              <FaPhone className="cursor-pointer hover:text-green-500" />
              <FaFacebook className="cursor-pointer hover:text-blue-700" />
            </div>
          </div>

          {/* Expandable Sections */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ExpandableSection title="Experience">
              <p>5+ years in Full Stack Web Development.</p>
            </ExpandableSection>
            <ExpandableSection title="Education">
              <p>Bachelor's Degree in Computer Science.</p>
            </ExpandableSection>
            <ExpandableSection title="Qualifications">
              <p>Certified React Developer & AWS Solutions Architect.</p>
            </ExpandableSection>
            <ExpandableSection title="Certifications">
              <p>Google Cloud Certification, AWS Certified Developer.</p>
            </ExpandableSection>
            <ExpandableSection title="Articles">
              <p>Published articles on Web Performance Optimization.</p>
            </ExpandableSection>
            <ExpandableSection title="Publications">
              <p>Research paper on AI-powered Chatbots.</p>
            </ExpandableSection>
            <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg">
              See More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
