import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setLoadingState } from "./loadingSlice";

const initialState = {
  skills: [{
    id: 1,
    name: "JavaScript",
  },{
    id: 2,
    name: "React",
  }, {
    id: 3,
    name: "Node.js",
  },{
    id: 4,
    name: "Python",
  },{
    id: 5,
    name: "Django",
  },{
    id: 6,
    name: "Ruby",
  }],
};

export const getSkills = createAsyncThunk (
  "fetch/skills",
  async (_, { rejectWithValue }) => {
    
  }
);

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSkills.pending, (state) => {
        setLoadingState({ actionName: "skills", isLoading: true });
      })
      .addCase(getSkills.fulfilled, (state, action) => {
        setLoadingState({ actionName: "skills", isLoading: false });
        state.skills = action.payload;
      })
      .addCase(getSkills.rejected, (state, action) => {
        setLoadingState({ actionName: "skills", isLoading: false });
        console.error("Skills fetch failed:", action.payload);
      });
  },
});

export default generalSlice.reducer;
