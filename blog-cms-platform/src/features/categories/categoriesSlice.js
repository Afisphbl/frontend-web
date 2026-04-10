import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFetch } from "../../service/getFetch";

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

const categoiesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (buiders) => {
    buiders
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
        state.error = action.payload;
      });
  },
});

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const data = await getFetch("categories");
    return data;
  },
);

export default categoiesSlice.reducer;
