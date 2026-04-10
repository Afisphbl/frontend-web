import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFetch } from "../../service/getFetch";
import { action } from "../../pages/Posts/Posts";

const initialState = {
  authors: [],
  status: "idle",
  error: null,
};

export const fetchAuthors = createAsyncThunk(
  "authors/fetchAuthors",
  async () => {
    const data = await getFetch("authors");
    return data;
  },
);

const authorSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.authors = [];
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.status = "success";
        state.authors = action.payload;
        state.error = null;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.authors = [];
        state.status = "error";
        state.error = action.error?.message ?? "Failed to fetch authors";
      });
  },
});

export default authorSlice.reducer;
