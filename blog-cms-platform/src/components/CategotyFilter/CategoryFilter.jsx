import React from "react";
import "./CategoryFilter.css";

const categories = [
  "All Posts",
  "Technology",
  "Design",
  "Business",
  "Engineering",
];

function CategoryFilter() {
  return (
    <div className="category-filter">
      {categories.map((category, index) => (
        <button
          className={`filter-chip ${index === 0 ? "active" : ""}`}
          key={index}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
