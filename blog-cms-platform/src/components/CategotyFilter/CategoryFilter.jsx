import React from "react";
import "./CategoryFilter.css";

const categories = [
  "All Posts",
  "Technology",
  "Design",
  "Business",
  "Engineering",
];

function CategoryFilter({ activeCategory = "All Posts" }) {
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          type="button"
          className={`filter-chip ${activeCategory === category ? "active" : ""}`}
          aria-pressed={activeCategory === category}
          key={category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
