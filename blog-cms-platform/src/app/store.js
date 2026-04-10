import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice";
import postsReducer from "../features/posts/postsSlice";
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    posts: postsReducer,
  },
});
