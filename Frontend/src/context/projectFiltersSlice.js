import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProjects } from "../API/projects";
import { setLoadingState } from "./loadingSlice";

const initialState = {
  projects: [],
  searchString: "",
  status: "",
  budget:"0-0",
  skills: "",
  projectLocation: "",
  clientLocation: "",
  languages: "",
  page: 0,
};

export const filterProjects = createAsyncThunk(
  "filter/projects",
  async (_, { getState, rejectWithValue }) => {
    try {
      const filters = getState().projectFilter;
      const responce = await fetchProjects(filters);
      return responce.data;
    } catch (err) {
      console.log("error in project slice->", err);
      return rejectWithValue({
        message: err.response?.data?.message || "Project fetching failed",
        status: err.response?.status || 500,
      });
    }
  }
);

export const projectFilterSlice = createSlice({
  name: "projectFilter",
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      Object.assign(state, action.payload);
      // Merge new filters with existing state
      filterProjects();
      console.log("filters->", state.status);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterProjects.pending, (state) => {
        setLoadingState({ actionName: "projects", isLoading: true });
      })
      .addCase(filterProjects.fulfilled, (state, action) => {
        setLoadingState({ actionName: "projects", isLoading: false });
        state.projects = action.payload;
      })
      .addCase(filterProjects.rejected, (state, action) => {
        setLoadingState({ actionName: "projects", isLoading: false });
        console.error("Project fetch failed:", action.payload);
      });
  },
});

export const { updateFilters } = projectFilterSlice.actions;

export default projectFilterSlice.reducer;
