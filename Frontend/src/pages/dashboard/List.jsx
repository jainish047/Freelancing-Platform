import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Home, Folder, List, Bell, User, ClipboardList, Bookmark, Eye, FileText } from "lucide-react";

const Favorites = () => {
  console.log("Favorites function called");

  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "1Easycommerce-New Jersey",
      username: "@NewJersey",
      rating: 5.0,
      reviews: 491,
      score: 10.0,
      completion: "100%",
      description:
        "New Jersey-Websites: Apps: Hubspot: Monday: CRM Greetings from Hightstown, New Jersey. We specialize in Database, Web, WordPress, e-Commerce...",
      skills: ["PHP", "Java", "JavaScript"],
      price: "$65 USD per hour",
      countryFlag: "🇺🇸",
    },
    {
      id: 2,
      name: "1Easycommerce-New Jersey",
      username: "@NewJersey",
      rating: 5.0,
      reviews: 491,
      score: 10.0,
      completion: "100%",
      description:
        "New Jersey-Websites: Apps: Hubspot: Monday: CRM\nGreetings from Hightstown, New Jersey  We specialize in Database, Web, WordPress, e-Commerce...",
      skills: ["PHP", "Java", "JavaScript"],
      price: "$65 USD per hour",
      countryFlag: "🇺🇸",
    },
  ]);

  //   fetch data and display real time data using axios and useEffect
  //   const [favorites, setFavorites] = useState([]);

  //   // Fetch Data from API
  //   useEffect(() => {
  //     axios.get("") // Replace with your API URL
  //       .then(response => {
  //         setFavorites(response.data); 
  //       })
  //       .catch(error => {
  //         console.error("Error fetching data:", error);
  //       });
  //   }, []);

  return (
    // Main Content
    <div className="flex-1 p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Favorite Users</h1>
      {
        favorites.map((user) => (
          <div key={user.id} className="border p-6 rounded-lg mb-6 shadow-sm bg-white flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user.name} {user.username}</h2>
              <p className="text-yellow-500 flex items-center mt-2">
                ⭐⭐⭐⭐⭐
                <span className="ml-2 text-gray-800">
                  {user.rating} ({user.reviews} Reviews) | Score: {user.score} | Completion: {user.completion}
                </span>
              </p>
              <p className="text-gray-600 mt-2 max-w-lg">{user.description}</p>
              <p className="text-blue-500 mt-2">{user.skills.join(" • ")}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900 text-lg">{user.price}</p>
              <p className="mt-1">{user.countryFlag}</p>
              <div className="mt-4 flex space-x-3">
                <Button variant="outline">Invite to Bid</Button>
                <Button>Contact</Button>
              </div>
            </div>
          </div>
        ))}

    </div >
  );

};

const RecentlyViewed = () => {
  console.log("RecentlyViewed function called");

  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        const response = await axios.get(""); // Replace with your API URL
        setRecentlyViewed(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchRecentlyViewed();
  }, []);
  return (
    <div className="flex-1 p-8 bg-gray-50 ml-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Recently Viewed</h1>
      {recentlyViewed.length > 0 ? (
        recentlyViewed.map((user) => (
          <div key={user.id} className="border p-6 rounded-lg mb-6 shadow-sm bg-white flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user.name} {user.username}</h2>
              <p className="text-yellow-500 flex items-center mt-2">⭐⭐⭐⭐⭐ <span className="ml-2 text-gray-800">{user.rating} ({user.reviews} Reviews) | Score: {user.score} | Completion: {user.completion}</span></p>
              <p className="text-gray-600 mt-2 max-w-lg">{user.description}</p>
              <p className="text-blue-500 mt-2">{user.skills.join(" • ")}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900 text-lg">{user.price}</p>
              <p className="mt-1">{user.countryFlag}</p>
              <div className="mt-4 flex space-x-3">
                <button className="border px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">Invite to Bid</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Contact</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}
    </div>


  );
};

const Watchlist = () => {
  console.log("Watchlist function called");

  const [bookmarked, setBookmarked] = useState({});
  const [search, setSearch] = useState("");
  const [bookmarkedProjects, setBookmarkedProjects] = useState([]);
  
  const [watchlist, setWatchlist] = useState([
    { id: 1, title: "React Dashboard UI", client: "John Doe", category: "Web Development", budget: "$300 - $500", startDate: "2025-02-10", closeDate: "2025-03-10" },
    { id: 2, title: "Logo Design for Startup", client: "Jane Smith", category: "Graphic Design", budget: "$50 - $100", startDate: "2025-03-15", closeDate: "2025-03-30" },
    { id: 3, title: "E-commerce Website", client: "Alice Johnson", category: "Web Development", budget: "$1000 - $2000", startDate: "2025-02-20", closeDate: "2025-03-25" },
    { id: 4, title: "Mobile App UI Design", client: "Robert Brown", category: "App Development", budget: "$500 - $800", startDate: "2025-03-05", closeDate: "2025-04-05" },
  ]);

  const checkStatus = (closeDate) => {
    const today = new Date();
    const projectCloseDate = new Date(closeDate);
    return projectCloseDate > today ? "Open" : "Closed";
  };

  const filteredWatchlist = watchlist.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleBookmark = (project) => {
    setBookmarked((prev) => ({ ...prev, [project.id]: !prev[project.id] }));
    setBookmarkedProjects((prev) => {
      if (prev.some((p) => p.id === project.id)) {
        return prev.filter((p) => p.id !== project.id);
      } else {
        return [...prev, project];
      }
    });
  };
  return (
    <main className="flex-1 p-6">
      <h2 className="text-2xl font-semibold mb-4">Watchlist</h2>
      <input
        type="text"
        placeholder="Search watchlist..."
        className="p-2 border rounded w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredWatchlist.length > 0 ? (
        <div className="space-y-4">
          {filteredWatchlist.map((project) => (
            <div
              key={project.id}
              className="p-4 border rounded-lg flex justify-between items-center bg-white shadow"
            >
              <div>
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-500">{project.client} • {project.category}</p>
                <p className="text-sm text-green-600">{project.budget}</p>
                <p className="text-sm text-gray-500">Start Date: {project.startDate}</p>
                <p className="text-sm text-gray-500">Close Date: {project.closeDate}</p>
                <p className={`text-sm ${checkStatus(project.closeDate) === "Open" ? "text-green-600" : "text-red-600"}`}>Status: {checkStatus(project.closeDate)}</p>
              </div>
              <Star
                className={`w-6 h-6 cursor-pointer ${bookmarked[project.id] ? "text-yellow-500" : "text-gray-400"}`}
                onClick={() => toggleBookmark(project)}
              />

            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No projects in your watchlist yet.</p>
      )
      }
    </main >
  );
};

const Bids = () => {
  console.log("Bids function called");

  const [project, setProject] = useState([
    {
      id: 1,
      name: "E-commerce Website",
      username: "@WebDevCo",
      rating: 4.8,
      reviews: 250,
      score: 9.5,
      completion: "98%",
      description: "Build a full-featured e-commerce website with React and TailwindCSS.",
      skills: ["React", "TailwindCSS", "Node.js"],
      price: "$500 - $1000",
      countryFlag: "🇺🇸",
      minBid: 500,
      maxBid: 1000,
      days: 7,
    },
    {
      id: 2,
      name: "Mobile App UI Design",
      username: "@UXStudio",
      rating: 5.0,
      reviews: 180,
      score: 9.8,
      completion: "100%",
      description: "Design a modern and intuitive UI for a mobile application.",
      skills: ["Figma", "Adobe XD", "UI/UX"],
      price: "$300 - $800",
      countryFlag: "🇬🇧",
      minBid: 300,
      maxBid: 800,
      days: 10,
    },
  ]);

  const [SelectedProject, setSelectedProject] = useState([]);
  const [BidAmount, setBidAmount] = useState("");
  const [DaysToComplete, setDaysToComplete] = useState("");
  const [SubmittedBids, setSubmittedBids] = useState([]);

  const handleBidClick = (project) => {
    setSelectedProject(project);
    setBidAmount(project.minBid);
    setDaysToComplete(project.days);
  };

  const handleSubmitBid = () => {
    if (!BidAmount || !DaysToComplete) return;
    setSubmittedBids([...SubmittedBids, { ...SelectedProject, BidAmount, DaysToComplete }]);
    setSelectedProject(null);
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Available Projects</h1>
      {project.map((project) => (
        <div key={project.id} className="border p-6 rounded-lg mb-4 shadow-sm bg-white flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{project.name} {project.username}</h2>
            <p className="text-yellow-500 flex items-center mt-2">⭐⭐⭐⭐⭐ <span className="ml-2 text-gray-800">{project.rating} ({project.reviews} Reviews) | Score: {project.score} | Completion: {project.completion}</span></p>
            <p className="text-gray-600 mt-2 max-w-lg">{project.description}</p>
            <p className="text-blue-500 mt-2">{project.skills?.join(" • ")}</p>
            <p className="text-gray-700 mt-2">Min Bid: ${project.minBid} - Max Bid: ${project.maxBid} | Days: {project.days}</p>
          </div>
          <Button onClick={() => handleBidClick(project)}>Bid</Button>
        </div>
      ))}
      {SelectedProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="p-6 bg-white border rounded-lg shadow-md w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Bid on {SelectedProject.name}</h2>
            <label className="block mb-2 text-gray-700">Your Bid Amount:</label>
            <input
              type="number"
              min={SelectedProject.minBid}
              max={SelectedProject.maxBid}
              value={BidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="border p-2 w-full mb-4 rounded"
            />
            <label className="block mb-2 text-gray-700">Days to Complete:</label>
            <input
              type="number"
              min="1"
              value={DaysToComplete}
              onChange={(e) => setDaysToComplete(e.target.value)}
              className="border p-2 w-full mb-4 rounded"
            />
            <div className="flex justify-between">
              <Button onClick={handleSubmitBid}>Submit Bid</Button>
              <Button onClick={() => setSelectedProject(null)} className="bg-red-500 text-white">Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {SubmittedBids.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Bid Done</h2>
          {SubmittedBids.map((bid, index) => (
            <div key={index} className="border p-6 rounded-lg mb-4 shadow-sm bg-white">
              <h2 className="text-xl font-semibold text-gray-900">{bid.name}</h2>
              <p className="text-gray-700">Bid Amount: ${bid.BidAmount} | Days: {bid.DaysToComplete}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const BookmarkList = () => {
  console.log("Bookmark function called");
  const [isBookmarkedUpdated, setIsBookmarkedUpdated] = useState(false);

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "EasyCommerce - New Jersey",
      username: "@NewJersey",
      rating: 5.0,
      reviews: 491,
      score: 10.0,
      completion: "100%",
      description: "We specialize in Database, Web, WordPress, e-Commerce...",
      skills: ["PHP", "Java", "JavaScript"],
      price: "$65 USD per hour",
      countryFlag: "🇺🇸",
      isBookmarked: true,
    },
    {
      id: 2,
      name: "TechSolutions - Canada",
      username: "@TechCanada",
      rating: 4.8,
      reviews: 320,
      score: 9.5,
      completion: "98%",
      description: "Building modern web solutions with React, Node.js, and AWS...",
      skills: ["React", "Node.js", "AWS"],
      price: "$50 USD per hour",
      countryFlag: "🇨🇦",
      isBookmarked: true,
    },
  ]);

  // const [Projects, setProjects] = useState([]);

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const response = await axios.get(""); // Replace with your API URL
  //       const bookmarked= response.data.filter((Projects)=> Projects.isBookmarked);
  //       setProjects(bookmarked);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchProjects();
  // },[isBookmarkedUpdated]);

  // Toggle Bookmark (Bookmark/Unbookmark)
  // const handleBookmark = async (projectId) => {
  //   try {
  //     await axios.post(`/api/bookmark/${projectId}`); // API to bookmark/unbookmark
  //     setIsBookmarkedUpdated((prev) => !prev); // Toggle value to trigger `useEffect`
  //   } catch (error) {
  //     console.error("Error updating bookmark:", error);
  //   }
  // };

  // for dummy data
  const handleBookmarkToggle = (id) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== id) // Remove unbookmarked project
    );
  };


  return (
    <div className="flex-1 p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Bookmarked Projects</h1>

      {projects.length === 0 ? (
        <p className="text-gray-500">No bookmarked projects yet.</p>
      ) : (
        projects.map((project) => (
          <div key={project.id} className="border p-6 rounded-lg mb-4 shadow-sm bg-white flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{project.name} {project.username}</h2>
              <p className="text-yellow-500 flex items-center mt-2">
                ⭐⭐⭐⭐⭐ <span className="ml-2 text-gray-800">{project.rating} ({project.reviews} Reviews) | Score: {project.score} | Completion: {project.completion}</span>
              </p>
              <p className="text-gray-600 mt-2 max-w-lg">{project.description}</p>
              <p className="text-blue-500 mt-2">{project.skills?.join(" • ")}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900 text-lg">{project.price}</p>
              <p className="mt-1">{project.countryFlag}</p>
              <div className="mt-4 flex space-x-3">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow">See Details</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow" onClick={() => navigate("/List/Bids")}>Bid</button>
              </div>
              {/* Unbookmark Button */}
              <button
                className="text-red-500 mt-4 hover:underline"
                onClick={() => handleBookmarkToggle(project.id)}  //for real time use handleBookmark function
              >
                Unbookmark
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const ListsPage = () => {

  const isLoggedIn = localStorage.getItem("authToken");

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect to login page if not logged in
      navigate("/login"); // Adjust the path according to your app structure
    }
  }, [isLoggedIn, navigate]);

  const navigate = useNavigate();
  const [activeList, setActiveList] = useState("favorites");

  const handleListChange = (list) => {
    setActiveList(list);
  };

  const renderContent = () => {
    switch (activeList) {
      case "Favorites":
        return <Favorites />;
      case "RecentlyViewed":
        return <RecentlyViewed />;
      case "Watchlist":
        return <Watchlist />;
      case "Bids":
        return <Bids />;
      case "Bookmark":
        return <BookmarkList />;
      default:
        return <Favorites />; // Fallback in case of an unexpected value
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Top Navbar */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center border-b">
        <div className="text-xl font-bold text-black">P4</div>
        <nav className="space-x-8">
          <a href="#" className="text-blue-500 font-medium">Dashboard</a>
          <a href="#" className="text-gray-600 hover:text-blue-500">Explore</a>
        </nav>
        <div className="flex items-center space-x-6">
          <Bell className="text-gray-600 w-6 h-6 hover:text-blue-500 cursor-pointer" />
          <User className="text-gray-600 w-6 h-6 hover:text-blue-500 cursor-pointer" onClick={() => navigate("/profile")} />
        </div>
      </div>

      <div className="flex flex-1">
        {/* Left Sidebar 1 - Icons with Names */}
        <div className="w-24 bg-white text-gray-700 p-4 flex flex-col items-center border-r shadow-sm min-h-screen">
          <nav className="space-y-6 text-gray-500 text-center">
            <div className="flex flex-col items-center">
              <Home className={`w-6 h-6 ${activeMenu === "Home" ? "text-blue-500" : "text-gray-500"}`} />
              <span className="text-xs mt-1">Home</span>
            </div>
            <div className="flex flex-col items-center">
              <Folder className={`w-6 h-6 ${activeMenu === "Folder" ? "text-blue-500" : "text-gray-500"}`} />
              <span className="text-xs mt-1">Projects</span>
            </div>
            <div className="flex flex-col items-center">
              <List className={`w-6 h-6 ${activeMenu === "List" ? "text-blue-500" : "text-gray-500"}`} />
              <span className="text-xs mt-1">Lists</span>
            </div>
            <div className="flex flex-col items-center">
              <ClipboardList className={`w-6 h-6 ${activeMenu === "ClipboardList" ? "text-blue-500" : "text-gray-500"}`} />
              <span className="text-xs mt-1">Updates</span>
            </div>
            <div className="flex flex-col items-center">
              <Bell className={`w-6 h-6 ${activeMenu === "Bell" ? "text-blue-500" : "text-gray-500"}`} />
              <span className="text-xs mt-1">Notifications</span>
            </div>
          </nav>
        </div>

        {/* Left Sidebar 2 - Lists with Icons */}
        <div className="w-72 bg-white p-6 border-r shadow-sm min-h-screen">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Lists</h2>
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Users</h2>
          <ul className="text-gray-600 space-y-2">
            <li className="text-blue-500 font-medium flex items-center"><Bookmark className="w-4 h-4 mr-2" /> Favourite</li>
            <li className={`flex items-center ${activeList === "RecentlyViewed" ? "text-blue-500" : "text-gray-500"}`} onClick={() => handleListChange("RecentlyViewed")}><Eye className="w-4 h-4 mr-2" /> Recently viewed</li>
          </ul>
          <h2 className="text-lg font-semibold mt-6 mb-4 text-gray-800">Projects</h2>
          <ul className="text-gray-600 space-y-2">
            <li className={`flex items-center ${activeList === "Watchlist" ? "text-blue-500" : "text-gray-500"}`} onClick={() => handleListChange("Watchlist")}><FileText className="w-4 h-4 mr-2" /> Watchlist</li>
            <li className={`flex items-center ${activeList === "Bids" ? "text-blue-500" : "text-gray-500"}`} onClick={() => handleListChange("Bids")}><ClipboardList className="w-4 h-4 mr-2" /> Bids</li>
          </ul>
          <h2 className="text-lg font-semibold mt-6 mb-4 text-gray-800">Posts</h2>
          <ul className="text-gray-600 space-y-2">
            <li className={`flex items-center ${activeList === "Bookmark" ? "text-blue-500" : "text-gray-500"}`} onClick={() => handleListChange("Bookmark")}><Bookmark className="w-4 h-4 mr-2" /> Bookmark</li>
          </ul>
        </div>


        {/* Main Content */}
        <div className="flex-1 p-8 bg-gray-50">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            {activeList === "Favorites" && "Favorites"}
            {activeList === "RecentlyViewed" && "RecentlyViewed"}
            {activeList === "Watchlist" && "Watchlist"}
            {activeList === "Bids" && "Bids"}
            {activeList === "Bookmark" && "Bookmark"}
          </h1>

          {/* Render the corresponding page content */}
          {renderContent()}
        </div>

      </div>

    </div>
  );
};

export default ListsPage;
