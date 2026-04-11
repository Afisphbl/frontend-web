import { Aperture, ArrowLeft, Globe, Mail } from "lucide-react";
import "./AuthorPostsPage.css";
import { Link, useLoaderData } from "react-router-dom";
import { getFetchById } from "../../service/getFetch";
import { useSelector } from "react-redux";
import { getPosts } from "../../features/posts/postsSelector";
import PostCard from "../../components/PostCard/PostCard";

function AuthorPost() {
  const { id, name, bio } = useLoaderData();
  const { posts = [] } = useSelector(getPosts);
  const authorPost = posts.filter((post) => +post.authorId === +id);
  const authorAvatar = name.at(0).toUpperCase();
  return (
    <section className="author-posts-page animation-fade-in">
      <Link to="/posts" className="back-link">
        <ArrowLeft size={20} />
        Back to Posts
      </Link>
      <div className="author-hero glass">
        <div className="author-avatar-huge">{authorAvatar}</div>
        <div className="author-hero-content">
          <div className="author-badge">Verified Author</div>
          <h1>{name}</h1>
          <p className="author-bio">{bio}</p>

          <div className="author-socials">
            <button
              className="social-btn"
              type="button"
              aria-label="Email Author"
            >
              <Mail size={20} />
            </button>

            <button
              className="social-btn"
              type="button"
              aria-label="View Author Portfolio"
            >
              <Aperture size={20} />
            </button>

            <button
              className="social-btn"
              type="button"
              aria-label="View Author Website"
            >
              <Globe size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="archive-header">
        <h2>Latest from {name}</h2>
        <span className="count">{authorPost.length} Articles</span>
      </div>

      <div className="posts-grid">
        {authorPost.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
}

export const loader = async ({ params }) => {
  const { authorId } = params;

  const data = await getFetchById("authors", authorId);

  return data;
};

export default AuthorPost;
