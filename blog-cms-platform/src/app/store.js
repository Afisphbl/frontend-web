import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice";
import postsReducer from "../features/posts/postsSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    posts: postsReducer,
    categories: categoriesReducer,
  },
});
