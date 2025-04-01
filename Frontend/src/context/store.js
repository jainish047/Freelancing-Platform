import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import loadingReducer from "./loadingSlice";
import projectFilterReducer from "./projectFiltersSlice";
import freelancerFilterReducer from "./freelancersFliterSlice";
import generalReducer from "./generalSlice"
import listsReducer from "./listSlice"

const store = configureStore({
  reducer: {
    general: generalReducer,
    auth: authReducer,
    loading: loadingReducer,
    projectFilter: projectFilterReducer,
    freelancerFilters:freelancerFilterReducer,
    lists: listsReducer,
  },
});

export default store;