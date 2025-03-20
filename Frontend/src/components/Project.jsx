import React, { useState } from 'react';

const Project = () => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Hardcoded project data
  const project = {
    ownerName: 'John Doe',
    budgetRange: { min: 1000, max: 5000 },
    description:
      'This is a detailed project description that explains the requirements and goals of the project. It may span multiple lines and provide insights into what the project entails. This project requires a skilled developer with experience in React, Node.js, and MongoDB.',
    requiredSkills: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    averageBidPrice: 2500,
    totalBids: 12,
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Project Owner Name */}
      <div className="flex items-center mb-4">
        <span className="text-lg font-semibold">{project.ownerName}</span>
      </div>

      {/* Project Budget Range */}
      <div className="mb-4">
        <span className="text-gray-600">Budget: </span>
        <span className="font-medium">
          ${project.budgetRange.min} - ${project.budgetRange.max}
        </span>
      </div>

      {/* Project Description with See More Toggle */}
      <div className="mb-4">
        <p className="text-gray-700">
          {showFullDescription
            ? project.description
            : `${project.description.substring(0, 150)}...`}
        </p>
        {project.description.length > 150 && (
          <button
            onClick={toggleDescription}
            className="text-blue-500 hover:text-blue-600 focus:outline-none"
          >
            {showFullDescription ? 'See Less' : 'See More'}
          </button>
        )}
      </div>

      {/* Required Skills */}
      <div className="mb-4">
        <h4 className="text-gray-600 font-medium mb-2">Required Skills:</h4>
        <div className="flex flex-wrap">
          {project.requiredSkills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm mr-2 mb-2"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Save/Bookmark Button */}
      <div className="mb-4">
        <button className="flex items-center text-blue-500 hover:text-blue-600 focus:outline-none">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            ></path>
          </svg>
          Save Project
        </button>
      </div>

      {/* Average Bid Price and Total Bids */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-gray-600">Average Bid: </span>
          <span className="font-medium">${project.averageBidPrice}</span>
        </div>
        <div>
          <span className="text-gray-600">Total Bids: </span>
          <span className="font-medium">{project.totalBids}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectBid;