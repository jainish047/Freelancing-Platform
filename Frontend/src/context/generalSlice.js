import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setLoadingState } from "./loadingSlice";

const initialState = {
  skills: [
    {
      id: 1,
      name: "JavaScript",
    },
    {
      id: 2,
      name: "React",
    },
    {
      id: 3,
      name: "Node.js",
    },
    {
      id: 4,
      name: "Python",
    },
    {
      id: 5,
      name: "Django",
    },
    {
      id: 6,
      name: "Ruby",
    },
  ],
  countries: [
    {
      id: 1,
      name: "USA",
    },
    {
      id: 2,
      name: "India",
    },
    {
      id: 3,
      name: "UK",
    },
    {
      id: 4,
      name: "Canada",
    },
    {
      id: 5,
      name: "Australia",
    },
    {
      id: 6,
      name: "Germany",
    },
    {
      id: 7,
      name: "France",
    },
    {
      id: 8,
      name: "Japan",
    },
    {
      id: 9,
      name: "China",
    },
    {
      id: 10,
      name: "Russia",
    },
    {
      id: 11,
      name: "Brazil",
    },
  ],
};

export const getSkills = createAsyncThunk(
  "fetch/skills",
  async (_, { rejectWithValue }) => {}
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
