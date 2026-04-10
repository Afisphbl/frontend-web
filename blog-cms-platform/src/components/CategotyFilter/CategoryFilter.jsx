import React from "react";
import "./CategoryFilter.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../features/posts/postsSelector";
import { setCategory } from "../../features/posts/postsSlice";

const categories = ["all", "technology", "design", "business", "engineering"];

function CategoryFilter() {
  const { category: activeCategory } = useSelector(getPosts);
  const dispatch = useDispatch();
  return (
    <div className="category-filter">
      {categories.map((category, index) => (
        <Link
          to={index === 0 ? "/posts?page=1" : `/posts?category=${index}&page=1`}
          type="button"
          className={`filter-chip ${activeCategory === category ? "active" : ""}`}
          aria-pressed={activeCategory === category}
          key={category}
          onClick={() => dispatch(setCategory(category))}
        >
          {category === "all" ? "all posts" : category}
        </Link>
      ))}
    </div>
  );
}

export default CategoryFilter;
