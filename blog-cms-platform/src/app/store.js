import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice";
import postsReducer from "../features/posts/postsSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import authorsReducer from "../features/authors/authorsSlice";
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    posts: postsReducer,
    categories: categoriesReducer,
    authors: authorsReducer,
  },
});
