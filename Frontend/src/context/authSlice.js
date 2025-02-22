import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, signup, resendVerificationEMail, logout } from "../API/authentication";
import { setLoadingState } from "./loadingSlice";
import {getSelfDetails} from "../API/user"

const initialState = {
  user: null,
  token: localStorage.getItem("authToken") || null,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const responce = await login(user);
      return responce.data;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || "Login failed",
        status: err.response?.status || 500
      });
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (user, { rejectWithValue }) => {
    try {
      console.log("in slice->user:", user);
      const response = await signup(user);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || "Login failed",
        status: err.response?.status || 500
      });
    }
  }
);

export const resendEmail = createAsyncThunk(
  "auth/resendEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await resendVerificationEMail(email);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || "Login failed",
        status: err.response?.status || 500
      });
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  logout(); // Clear token
  return null;
});

// Async action to fetch user details
export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // ✅ Get token from Redux store
      console.log("token in fetch user->", token);

      if (!token) return rejectWithValue("No token found"); // No token, user is logged out.

      const response = await getSelfDetails();
      console.log("response in fetch user->", response);

      return response.data; // ✅ Return user data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch user details"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("authToken");
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Login Reducers
      .addCase(loginUser.pending, (state) => {
        setLoadingState({ actionName: "login", isLoading: true });
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        setLoadingState({ actionName: "login", isLoading: false });
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        setLoadingState({ actionName: "login", isLoading: false });
        state.error = action.payload; // Now contains only message & status
      })

      // ✅ Signup Reducers
      .addCase(signupUser.pending, (state) => {
        setLoadingState({ actionName: "signup", isLoading: true });
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        setLoadingState({ actionName: "signup", isLoading: false });
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signupUser.rejected, (state, action) => {
        setLoadingState({ actionName: "signup", isLoading: false });
        state.error = action.payload;
      })

      // ✅ Resend Verification Email Reducers
      .addCase(resendEmail.pending, (state) => {
        setLoadingState({ actionName: "resendEmail", isLoading: true });
        state.error = null;
      })
      .addCase(resendEmail.fulfilled, (state) => {
        setLoadingState({ actionName: "resendEmail", isLoading: false });
      })
      .addCase(resendEmail.rejected, (state, action) => {
        setLoadingState({ actionName: "resendEmail", isLoading: false });
        state.error = action.payload;
      })

      // ✅ Logout Reducers
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
      })

      .addCase(fetchUserDetails.pending, (state) => {
        setLoadingState({ actionName: "fetchUserInfo", isLoading: true });
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        setLoadingState({ actionName: "fetchUserInfo", isLoading: false });
        state.user = action.payload; // ✅ Save user details in Redux
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        setLoadingState({ actionName: "fetchUserInfo", isLoading: false });
        state.error = action.payload;
        state.user = null;
        localStorage.removeItem("authToken"); // Remove invalid token
      });
  },
});

export default authSlice.reducer;
