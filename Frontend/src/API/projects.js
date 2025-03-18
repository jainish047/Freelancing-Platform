import { api } from "./axiosConfig";

const fetchProjects = async (filters) =>{
    try{
        return api.get("/projects", {filters})
        // in backend: body.filters.status
    }catch(err){
        console.log("error in projects fetch:->", err)
    }
}

export {
    fetchProjects
}