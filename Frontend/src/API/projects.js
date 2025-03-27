import { api } from "./axiosConfig";

const fetchProjects = async (filters) =>{
    try{
        console.log("filters in api call->", filters)
        return api.get("/projects", {params:filters})
        // in backend: body.filters.status
    }catch(err){
        console.log("error in projects fetch:->", err)
    }
}

export {
    fetchProjects
}