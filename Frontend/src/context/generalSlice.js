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
  projectsPerPage:10,
};

export const getSkills = createAsyncThunk(
  "fetch/skills",
  async (_, { rejectWithValue }) => {
    try {
      return initialState.skills;
    } catch (err) {
      return rejectWithValue({
        message: err.message || "Skills fetching failed",
        status: err.status || 500,
      });
    }
  }
);

export const getCountries = createAsyncThunk(
  "fetch/countries",
  async (_, { rejectWithValue }) => {
    try {
      return initialState.countries;
    } catch (err) {
      return rejectWithValue({
        message: err.message || "Countries fetching failed",
        status: err.status || 500,
      });
    }
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
      })
      .addCase(getCountries.pending, (state) => {
        setLoadingState({ actionName: "countries", isLoading: true });
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        setLoadingState({ actionName: "countries", isLoading: false });
        state.countries = action.payload;
      })
      .addCase(getCountries.rejected, (state, action) => {
        setLoadingState({ actionName: "countries", isLoading: false });
        console.error("Skills fetch failed:", action.payload);
      });
  },
});

export default generalSlice.reducer;
