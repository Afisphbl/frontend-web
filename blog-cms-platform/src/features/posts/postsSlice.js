import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFetch } from "../../service/getFetch";

const initialState = {
  posts: [],
  category: "all",
  status: "idle",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = "success";
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.posts = [];
        state.status = action.payload;
      });
  },
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const data = await getFetch("posts");

  return data;
});

export const { setCategory } = postsSlice.actions;

export default postsSlice.reducer;
