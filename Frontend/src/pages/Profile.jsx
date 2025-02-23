import React, { useState } from "react";
import { AiOutlineLike, AiOutlineMessage } from "react-icons/ai";


export default function Profile() {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleMessage = () => {
    alert("Message button clicked!");
  };

  const profileData = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    bio: "A passionate web developer with 5+ years of experience in building scalable and efficient web applications.",
    skills: ["React", "Node.js", "JavaScript", "CSS", "HTML"],
    accountType: "Individual",
    rating: 4.5,
    profilePicture: "data:image/jpeg;base64,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", 
    workExperience: [
      {
        company: "Tech Corp",
        role: "Frontend Developer",
        duration: "Jan 2020 - Present",
      },
      {
        company: "Web Solutions",
        role: "Junior Developer",
        duration: "May 2018 - Dec 2019",
      },
    ],
    statistics: {
      projectsCompleted: 35,
      clientsWorkedWith: 20,
      yearsOfExperience: 5,
    },
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center"
    >
      <div className="max-w-4xl mx-auto mt-10 p-6 shadow-lg rounded-lg border border-gray-200 flex flex-col md:flex-row gap-6 bg-white">
        
        <div className="md:w-2/3">
          <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>

          
          <div className="flex justify-center mb-6">
            <img
              src={profileData.profilePicture}
              alt="Profile Picture"
              className="w-24 h-24 rounded-full shadow-md border"
            />
          </div>

          
          <div className="mb-4 flex items-center justify-between">
            <div>
              <label className="font-semibold text-gray-700">Name:</label>
              <p className="text-gray-800">{profileData.name}</p>
            </div>
            <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm font-semibold">Verified</div>
          </div>

          
          <div className="mb-4">
            <label className="font-semibold text-gray-700">Email:</label>
            <p className="text-gray-800">{profileData.email}</p>
          </div>

         
          <div className="mb-4">
            <label className="font-semibold text-gray-700">Phone:</label>
            <p className="text-gray-800">{profileData.phone}</p>
          </div>

          
          <div className="mb-4">
            <label className="font-semibold text-gray-700">Bio:</label>
            <p className="text-gray-800">{profileData.bio}</p>
          </div>

         
          <div className="mb-4">
            <label className="font-semibold text-gray-700">Skills:</label>
            <ul className="list-disc list-inside text-gray-800">
              {profileData.skills.map((skill, index) => (
                <li
                  key={index}
                  className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm mr-2 mb-2"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

         
          <div className="mb-4">
            <label className="font-semibold text-gray-700">Account Type:</label>
            <p className="text-gray-800">{profileData.accountType}</p>
          </div>

          
          <div className="mb-4 flex items-center">
            <label className="font-semibold text-gray-700 mr-2">Rating:</label>
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={index < Math.floor(profileData.rating) ? "#FFD700" : "#E5E7EB"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 17.25l6.16 3.73-1.64-7.03L21.5 9.8l-7.2-.61L12 2.75l-2.3 6.44-7.2.61 5.98 4.15-1.64 7.03L12 17.25z"
                  />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">({profileData.rating})</span>
            </div>
          </div>

          
          <div className="mt-6 flex gap-4 justify-center">
            <button
              onClick={handleLike}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 flex items-center gap-2"
            >
              <AiOutlineLike className="w-5 h-5" /> ({likes})
            </button>
            <button
              onClick={handleMessage}
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 flex items-center gap-2"
            >
              <AiOutlineMessage className="w-5 h-5" /> Message
            </button>
          </div>
        </div>

        
        <div className="md:w-1/3 bg-gray-50 p-4 rounded-lg border border-gray-200">
          
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-gray-700">WORK Experience</h2>
            {profileData.workExperience.map((work, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold text-gray-800">{work.role}</h3>
                <p className="text-gray-600">{work.company}</p>
                <p className="text-gray-500 text-sm">{work.duration}</p>
              </div>
            ))}
          </div>

          
          <div>
            <h2 className="text-xl font-bold mb-3 text-gray-700">Statistics</h2>
            <ul className="text-gray-800">
              <li className="mb-2">Projects Completed: {profileData.statistics.projectsCompleted}</li>
              <li className="mb-2">Clients Worked With: {profileData.statistics.clientsWorkedWith}</li>
              <li>Years of Experience: {profileData.statistics.yearsOfExperience}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
