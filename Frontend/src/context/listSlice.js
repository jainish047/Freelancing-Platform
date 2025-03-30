import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToList, createNewList, fetchItems, fetchLists } from "../API/list";
import { setLoadingState } from "./loadingSlice";

const initialState = {
  lists: [],
  selectedList: null,
  items: []
};

export const getLists = createAsyncThunk(
  "lists/getLists",
  async (_, { rejectWithValue }) => {
    try {
      const responce = await fetchLists();
      console.log("lists->", responce.data.lists);
      return responce.data.lists;
    } catch (err) {
      return rejectWithValue({
        message: err.message || "lists fetching failed",
        status: err.status || 500,
      });
    }
  }
);

export const getItems = createAsyncThunk(
    "lists/getItems",
    async ({listId}, { rejectWithValue }) => {
      try {
        const responce = await fetchItems(listId);
        console.log("items->", responce.data.items);
        return responce.data.items;
      } catch (err) {
        return rejectWithValue({
          message: err.message || "items fetching failed",
          status: err.status || 500,
        });
      }
    }
  );

export const createList = createAsyncThunk(
  "lists/createList",
  async ({ name, type }, { rejectWithValue }) => {
    try {
      const responce = await createNewList(name, type);
      console.log("skills->", responce.data.skills);
      return responce.data.lists;
    } catch (err) {
      return rejectWithValue({
        message: err.message || "list create failed",
        status: err.status || 500,
      });
    }
  }
);

export const addItemToList = createAsyncThunk(
  "lists/addToList",
  async ({ listId, type, entityId }, { rejectWithValue }) => {
    try {
      const responce = await addToList(listId, type, entityId);
      console.log("items->", responce.data.items);
      return responce.data.items;
    } catch (err) {
      return rejectWithValue({
        message: err.message || "item add failed",
        status: err.status || 500,
      });
    }
  }
);

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    setSelectedList:(state, action)=>{
        state.selectedList = action.payload || "like"
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLists.pending, (state) => {
        setLoadingState({ actionName: "lists", isLoading: true });
      })
      .addCase(getLists.fulfilled, (state, action) => {
        setLoadingState({ actionName: "lists", isLoading: false });
        state.lists = action.payload;
      })
      .addCase(getLists.rejected, (state, action) => {
        setLoadingState({ actionName: "lists", isLoading: false });
        console.error("Skills fetch failed:", action.payload);
      })
      .addCase(getItems.pending, (state) => {
        setLoadingState({ actionName: "listItems", isLoading: true });
      })
      .addCase(getItems.fulfilled, (state, action) => {
        setLoadingState({ actionName: "listItems", isLoading: false });
        state.items = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        setLoadingState({ actionName: "listItems", isLoading: false });
        console.error("Skills fetch failed:", action.payload);
      })
      .addCase(createList.pending, (state) => {
        setLoadingState({ actionName: "newList", isLoading: true });
      })
      .addCase(createList.fulfilled, (state, action) => {
        setLoadingState({ actionName: "newList", isLoading: false });
        state.lists = action.payload;
      })
      .addCase(createList.rejected, (state, action) => {
        setLoadingState({ actionName: "newList", isLoading: false });
        console.error("Skills fetch failed:", action.payload);
      })
      .addCase(addItemToList.pending, (state) => {
        setLoadingState({ actionName: "addToList", isLoading: true });
      })
      .addCase(addItemToList.fulfilled, (state, action) => {
        setLoadingState({ actionName: "addToList", isLoading: false });
        state.items = action.payload;
      })
      .addCase(addItemToList.rejected, (state, action) => {
        setLoadingState({ actionName: "addToList", isLoading: false });
        console.error("Skills fetch failed:", action.payload);
      });
  },
});

export const { setSelectedList } = listsSlice.actions;

export default listsSlice.reducer;
