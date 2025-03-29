import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaTimes } from "react-icons/fa";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState({
    title: "Mobile App Development",
    description:
      "We need a real-time, location-based video-sharing app where users can record and upload short video clips.",
    functions: [
      "Users can only record and upload videos directly from the app camera (no pre-recorded uploads)",
      "Videos are automatically deleted after 30 minutes to keep content fresh",
      "Videos are pinned to a map interface based on the user's location",
      "Users can browse the map and watch recently uploaded videos from different locations",
      "Users can react to videos with short comments (5 words max)",
      "Basic account system where users can create profiles and track their uploaded videos",
      "A simple admin dashboard to monitor user activity and remove inappropriate content",
      "Scalable backend to handle video uploads, storage, and automatic deletion",
    ],
    requiredSkills: ["React", "Node.js", "MongoDB", "Stripe API", "TailwindCSS"],
    minBudget: 250,
    maxBudget: 750,
    client: {
      location: "Cairo, Egypt",
      memberSince: "Mar 27, 2025",
      rating: 4.2,
      totalSpent: 1000,
      verified: {
        identity: true,
        payment: true,
        deposit: true,
        email: true,
        profile: true,
        phone: true,
      },
    },
  });
  const [bidAmount, setBidAmount] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [proposal, setProposal] = useState("");
  const [error, setError] = useState("");
  const [milestoneDetails, setMilestoneDetails] = useState([{ description: "", amount: "" }]);


  // useEffect(() => {
  //   const fetchProject = async () => {
  //     try {
  //       const response = await axios.get(`https://api.example.com/projects/${id}`);
  //       setProject(response.data);
  //     } catch (err) {
  //       setError("Failed to fetch project details. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProject();
  // }, [id]);

  const handleMilestoneChange = (index, field, value) => {
    const updatedMilestones = [...milestoneDetails];
    updatedMilestones[index] = { ...updatedMilestones[index], [field]: value };
    setMilestoneDetails(updatedMilestones);
  };

  const addMilestone = () => {
    setMilestoneDetails([...milestoneDetails, { description: "", amount: "" }]);
  };

  const cancelMilestone = (index) => {
    const updatedMilestones = milestoneDetails.filter((_, i) => i !== index);
    setMilestoneDetails(updatedMilestones);
  };

  const validateForm = () => {
    if (!bidAmount || bidAmount < project.minBudget || bidAmount > project.maxBudget) {
      setError(`Bid amount must be between ${project.minBudget} and ${project.maxBudget}.`);
      return false;
    }
    if (!deliveryTime || deliveryTime < 1) {
      setError("Delivery time must be at least 1 day.");
      return false;
    }
    if (proposal.length < 100) {
      setError("Proposal must be at least 100 characters long.");
      return false;
    }
    for (let milestone of milestoneDetails) {
      if (!milestone.description || !milestone.amount || milestone.amount <= 0) {
        setError("All milestone fields must be filled and amount should be greater than zero.");
        return false;
      }
    }
    setError("");
    return true;
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg text-blue-700">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <h2 className="text-lg font-semibold mt-4">Project Details</h2>
          <p className="text-gray-600">{project.description}</p>
          <ul className="list-disc pl-5 text-gray-600">
            {project.functions.map((func, index) => (
              <li key={index}>{func}</li>
            ))}
          </ul>
          <h3 className="mt-4 font-semibold">Required Skills</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.requiredSkills.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm">{skill}</span>
            ))}
          </div>
          <p className="mt-2 font-semibold">Budget: ${project.minBudget} - ${project.maxBudget} USD</p>
        </div>
        <div className="col-span-1 p-4 border rounded-lg shadow-md bg-gray-50">
          <h2 className="font-semibold">About the Client</h2>
          <p>Location: {project.client.location}</p>
          <p>Member since: {project.client.memberSince}</p>
          <h3 className="mt-2 font-semibold">Client Rating</h3>
          <div className="flex text-yellow-500">
            {'★'.repeat(Math.round(project.client.rating))}
            {'☆'.repeat(5 - Math.round(project.client.rating))}
          </div>
          <h3 className="mt-2 font-semibold">Client Verification</h3>
          <ul className="list-disc pl-5 text-gray-600">
            {Object.entries(project.client.verified).map(([key, value]) => (
              <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value ? "Verified" : "Not Verified"}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 p-4 border rounded-lg shadow-md bg-gray-50">
        <h2 className="text-lg font-semibold">Place a Bid</h2>
        {error && <p className="text-red-500">{error}</p>}
        <label className="block mt-2">Bid Amount ($)</label>
        <input type="number" className="border rounded p-2 w-full" placeholder="Enter bid amount" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} required />
        <label className="block mt-2">Delivery Time (Days)</label>
        <input type="number" className="border rounded p-2 w-full" placeholder="Enter delivery time" value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)} required />
        <label className="block mt-2">Your Proposal</label>
        <textarea className="border rounded p-2 w-full" placeholder="Write your proposal (min 100 characters)" value={proposal} onChange={(e) => setProposal(e.target.value)} required />
        <h3 className="mt-4 font-semibold">Milestones Payment</h3>
        {milestoneDetails.map((milestone, index) => (
          <div key={index} className="mt-2 flex items-center">
            <input type="text" className="border rounded p-2 w-full" placeholder="Milestone description" value={milestone.description} onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)} required />
            <input type="number" className="border rounded p-2 w-full ml-2" placeholder="Amount ($)" value={milestone.amount} onChange={(e) => handleMilestoneChange(index, 'amount', e.target.value)} required />
            <FaTimes className="text-red-500 cursor-pointer ml-2" onClick={() => cancelMilestone(index)} />
          </div>
        ))}
        <button onClick={addMilestone} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">Add Milestone</button>
      </div>
      
        <button 
          onClick={() => validateForm() && alert("Bid submitted successfully!")} 
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Submit Bid
        </button>
     
    </div>
  );
};

export default ProjectDetails;
