import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import loadingReducer from "./loadingSlice";
import projectFilterReducer from "./projectFiltersSlice";
import generalReducer from "./generalSlice"

const store = configureStore({
  reducer: {
    general: generalReducer,
    auth: authReducer,
    loading: loadingReducer,
    projectFilter: projectFilterReducer,
  },
});

export default store;
