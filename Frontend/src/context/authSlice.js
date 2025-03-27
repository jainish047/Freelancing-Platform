import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login,
  signup,
  resendVerificationEMail,
  logout,
} from "../API/authentication";
import { setLoadingState } from "./loadingSlice";
import { getSelfDetails } from "../API/user";
import { useDispatch } from "react-redux";

const initialState = {
  user: null,
  token: localStorage.getItem("authToken"),
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoadingState({ actionName: "login", isLoading: true }));
      const response = await login(user);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || "Login failed",
        status: err.response?.status || 500,
      });
    } finally {
      dispatch(setLoadingState({ actionName: "login", isLoading: false }));
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (user, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoadingState({ actionName: "signup", isLoading: true }));
      const response = await signup(user);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || "Signup failed",
        status: err.response?.status || 500,
      });
    } finally {
      dispatch(setLoadingState({ actionName: "signup", isLoading: false }));
    }
  }
);

export const resendEmail = createAsyncThunk(
  "auth/resendEmail",
  async (email, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoadingState({ actionName: "resendEmail", isLoading: true }));
      const response = await resendVerificationEMail(email);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || "Resend email failed",
        status: err.response?.status || 500,
      });
    } finally {
      dispatch(setLoadingState({ actionName: "resendEmail", isLoading: false }));
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  logout();
  return null;
});

export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoadingState({ actionName: "fetchUserInfo", isLoading: true }));
      const token = getState().auth.token;
      if (!token) return rejectWithValue("No token found");
      const response = await getSelfDetails();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch user details"
      );
    } finally {
      dispatch(setLoadingState({ actionName: "fetchUserInfo", isLoading: false }));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);
    },
    logoutReducer: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("authToken", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("authToken", action.payload.token);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(resendEmail.pending, (state) => {
        state.error = null;
      })
      .addCase(resendEmail.fulfilled, () => {})
      .addCase(resendEmail.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
        localStorage.removeItem("authToken");
      })
      .addCase(fetchUserDetails.pending, () => {})
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log("user in slice after extract->", state.user);
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.user = null;
        localStorage.removeItem("authToken");
      });
  },
});

export const { setToken, logoutReducer } = authSlice.actions;
export default authSlice.reducer;
