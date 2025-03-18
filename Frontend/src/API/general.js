import { api } from "./axiosConfig";

const fetchSkills = async (filters) =>{
    try{
        return api.get("/skills")
        // in backend: body.filters.status
    }catch(err){
        console.log("error in projects fetch:->", err)
    }
}

export {
    fetchSkills
}