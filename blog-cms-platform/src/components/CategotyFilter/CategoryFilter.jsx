import React from "react";
import "./CategoryFilter.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../features/posts/postsSelector";
import { setCategory } from "../../features/posts/postsSlice";

// const categories = ["all", "technology", "design", "business", "engineering"];

function CategoryFilter({ categories }) {
  const { category: activeCategory } = useSelector(getPosts);
  const dispatch = useDispatch();
  return (
    <div className="category-filter">
      <Link
        to="/posts?page=1"
        className={`filter-chip ${activeCategory === "all" ? "active" : ""}`}
        aria-pressed={activeCategory === "all"}
        onClick={() => dispatch(setCategory("all"))}
      >
        all posts
      </Link>
      {categories.map((category, index) => (
        <Link
          to={`/posts?category=${index + 1}&page=1`}
          type="button"
          className={`filter-chip ${activeCategory === category ? "active" : ""}`}
          aria-pressed={activeCategory === category}
          key={category}
          onClick={() => dispatch(setCategory(category))}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}

export default CategoryFilter;
