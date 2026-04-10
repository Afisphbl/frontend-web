import { Funnel, MessageSquare, Plus, Search } from "lucide-react";

import "./Posts.css";
import PostCard from "../../components/PostCard/PostCard";
import CategoryFilter from "../../components/CategotyFilter/CategoryFilter";
import { useSelector } from "react-redux";
import { getPosts } from "../../features/posts/postsSelector";
import {
  Form,
  redirect,
  useActionData,
  useSearchParams,
} from "react-router-dom";
import { getFetch } from "../../service/getFetch";
import { useEffect, useRef } from "react";

const categories = ["technology", "design", "business", "engineering"];
const authors = ["alex-rivera", "jordan-smith", "morgan-lee"];

function Posts() {
  const { posts } = useSelector(getPosts);
  const [searchParams] = useSearchParams();
  const { success } = useActionData();
  const formRef = useRef();
  const categoryId = searchParams.get("category") ?? "all";
  const filteredPosts =
    categoryId !== "all"
      ? posts?.filter((post) => +post.categoryId === +categoryId)
      : posts;

  useEffect(() => {
    if (success) {
      formRef.current?.reset();
    }
  }, [success]);

  return (
    <main className="posts-page animate-fade-in">
      <section className="page-header">
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
      </section>

      <section className="filter-section">
        <div className="section-label">
          <Funnel size={20} />
          <span>Filter by Category</span>
        </div>

        <CategoryFilter categories={categories} />

        <div className="posts-grid">
          {Array.isArray(filteredPosts) && filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <PostCard key={post.id} {...post} />)
          ) : (
            <div className="no-posts glass">
              <MessageSquare size={40} />
              <h2>No posts found</h2>
              <p>Try changing your search or category filter.</p>
            </div>
          )}
        </div>
      </section>

      <section className="quick-create glass">
        <h2>Quick Post</h2>

        <Form method="post" className="quick-form" ref={formRef}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="Stunning headline..."
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select id="category" name="category" required>
                <option value="technology">Technology</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
                <option value="engineering">Engineering</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <select id="author" name="author" required>
                <option value="alex-rivera">John Doe</option>
                <option value="jordan-smith">Jane Smith</option>
                <option value="morgan-lee">Morgan Lee</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="content">Content Preview</label>
            <textarea
              id="content"
              name="content"
              required
              placeholder="Share your thoughts..."
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={success}
            className={`btn-primary ${success ? "submitting" : ""}`}
          >
            {success ? (
              "Publishing..."
            ) : (
              <span>
                <Plus size={20} /> Publish Post
              </span>
            )}
          </button>
        </Form>
      </section>
    </main>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const title = data.title?.trim();
  const content = data.content?.trim();

  const categoryId =
    categories.findIndex((category) => category === data.category) + 1;
  const authorId = authors.findIndex((author) => author === data.author) + 1;
  const createdAt = new Date().toISOString();

  if (!title || !content || categoryId < 1 || authorId < 1) {
    throw new Response("Invalid post data", { status: 400 });
  }

  const newPost = {
    title,
    content,
    categoryId,
    authorId,
    status: "published",
    createdAt,
  };

  const optional = {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json",
    },
  };

  await getFetch("posts", optional);
  return { success: true, message: "Post published successfully!" };
};

export default Posts;
