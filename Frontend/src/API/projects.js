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


export { fetchProjects, fetchProjectDetails };
