import { Funnel, Search } from "lucide-react";

import "./Posts.css";
import PostCard from "../../components/PostCard/PostCard";
import CategoryFilter from "../../components/CategotyFilter/CategoryFilter";
import { getFetch } from "../../service/getFetch";
import { useLoaderData } from "react-router-dom";

function Posts() {
  const posts = useLoaderData();
  return (
    <main className="posts-page animate-fade-in">
      <div className="page-header">
        <div className="header-text">
          <h1>
            Journal <span>&</span> Insights
          </h1>
          <p>
            Explore latest stories, tutorials, and industry insights from our
            top writers.
          </p>
        </div>
        <div className="search-bar glass">
          <Search size={20} />
          <input
            type="search"
            name="searchPosts"
            id="searchPosts"
            placeholder="Search articles..."
          />
        </div>
      </div>

      <section className="filter-section">
        <div className="section-label">
          <Funnel size={20} />
          <span>Filter by Category</span>
        </div>

        <CategoryFilter />

        <div className="posts-grid">
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </section>
    </main>
  );
}

export async function loader() {
  const data = await getFetch("posts");
  return data;
}

export default Posts;
