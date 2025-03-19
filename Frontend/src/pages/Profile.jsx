import React from "react";

const Profile = () => {
  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-lg">
      {/* Profile Header */}
      <div className="flex items-center justify-between gap-4 border pb-4 rounded-lg p-4 shadow-sm border-purple-200 w-full">
        <div className="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold text-blue-700">Diana Ross</h2>
            <p className="text-gray-500">Professional Title</p>
            <p className="text-sm text-gray-400">📍 New York</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-yellow-500 text-xl">⭐ 4.8</p>
            <p className="text-sm text-gray-500">Rating</p>
          </div>
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
            🏆 Top Rated
          </span>
        </div>
      </div>

      {/* Overview Section */}
      <div className="py-4 w-full">
        <h3 className="font-bold">Overview</h3>
        <p className="text-gray-600">
          Ex consectetur veniam eiusmod in laboris aliquip exercitation eu culpa elit laborum laboris consectetur incididunt dolor.
          Sit nostrud reprehenderit adipiscing officia anim dolor cupidatat veniam eiusmod. Veniam aute mollit irure dolor id eu quis irure sint.
          Aliqua ullamco elit laboris eu aliquip.
        </p>
        <div className="flex gap-6 mt-4">
          <div>
            <p className="font-semibold">$49.00</p>
            <p className="text-gray-500 text-sm">Hourly rate</p>
          </div>
          <div>
            <p className="font-semibold">70+</p>
            <p className="text-gray-500 text-sm">Total projects</p>
          </div>
          <div>
            <p className="font-semibold">60+</p>
            <p className="text-gray-500 text-sm">Project finished</p>
          </div>
          <div>
            <p className="font-semibold">2000+</p>
            <p className="text-gray-500 text-sm">Hours worked</p>
          </div>
        </div>
      </div>

      {/* Work History and Feedback */}
      <div className="border-t pt-4 w-full">
        <h3 className="text-lg font-semibold">Work history and feedback</h3>
        <div className="mt-3 space-y-4">
          {/* E-commerce Website */}
          <div className="p-4 bg-gray-100 rounded-lg w-full">
            <h4 className="font-semibold">E-commerce Website <span className="text-gray-500 text-sm">- Mar 2021</span></h4>
            <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
            <p className="text-gray-600 mt-2">Developed a high-performance e-commerce platform with seamless checkout and responsive design.</p>
            <div className="flex gap-2 mt-2">
              <img src="https://via.placeholder.com/80" alt="Project" className="w-20 h-20 rounded-md" />
              <img src="https://via.placeholder.com/80" alt="Project" className="w-20 h-20 rounded-md" />
              <img src="https://via.placeholder.com/80" alt="Project" className="w-20 h-20 rounded-md" />
            </div>
          </div>
          {/* Import-Export Website */}
          <div className="p-4 bg-gray-100 rounded-lg w-full">
            <h4 className="font-semibold">Import-Export Website <span className="text-gray-500 text-sm">- Feb 2021</span></h4>
            <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
            <p className="text-gray-600 mt-2">Designed and built a scalable platform for import-export businesses to manage logistics and transactions efficiently.</p>
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Show all feedback</button>
      </div>

      {/* Sidebar - Rating and Contact */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md w-full">
        <h4 className="font-semibold">Message</h4>
        <p className="text-yellow-500 text-xl">⭐ 4.8</p>
        <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg">Send Message</button>
      </div>
    </div>
  );
};

export default Profile;
