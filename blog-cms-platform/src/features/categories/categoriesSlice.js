import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFetch } from "../../service/getFetch";

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const data = await getFetch("categories");
    return data;
  },
);

const categoiesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (buider) => {
    buider
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categories = [];
        state.status = "error";
        state.error = action.error?.message ?? "Failed to fetch categories";
      });
  },
});

export default categoiesSlice.reducer;
