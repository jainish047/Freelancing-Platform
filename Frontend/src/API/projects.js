import { api } from "./axiosConfig";

const fetchProjects = async (filters) => {
  try {
    console.log("filters in api call->", filters);
    return api.get("/projects", { params: filters });
  } catch (err) {
    console.log("error in projects fetch:->", err);
  }
};

const fetchProjectDetails = async (id) => {
  try {
    console.log("id of project fetch in api call->", id);
    return api.get(`/projects/${id}`);
  } catch (err) {
    console.log("error in projects fetch:->", err);
  }
};

export async function getMyProjects() {
  try {
    return api.get(`/projects2/my`);
  } catch (err) {
    console.log("error in projects fetch:->", err);
  }
}

export async function getAssignedProjects(){
  try {
    return api.get(`/projects2/assigned`);
  } catch (err) {
    console.log("error in projects fetch:->", err);
  }
}

export async function bid({bidAmount, deliveryTime, proposal, milestoneDetails, id}){
  try {
    return api.post(`/projects/${id}/bid`, {bidAmount, deliveryTime, proposal, milestoneDetails});
  } catch (err) {
    console.log("error in projects fetch:->", err);
  }
}

export async function getBids(){
  try {
    return api.get(`/projects2/bids`);
  } catch (err) {
    console.log("error in projects fetch:->", err);
  }
}

export { fetchProjects, fetchProjectDetails };
