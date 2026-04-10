import { Funnel, Search } from "lucide-react";

import "./Posts.css";
import PostCard from "../../components/PostCard/PostCard";
import CategoryFilter from "../../components/CategotyFilter/CategoryFilter";
import { useSelector } from "react-redux";
import { getPosts } from "../../features/posts/postsSelector";

function Posts() {
  const { posts } = useSelector(getPosts);
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
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} {...post} />)
          ) : (
            <div className="no-posts glass">
              <h2>No posts found</h2>
              <p>Try changing your search or category filter.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Posts;
