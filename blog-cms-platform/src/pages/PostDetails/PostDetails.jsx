import React from "react";
import "./PostDetailsPage.css";
import { Link, useLoaderData } from "react-router-dom";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Clock,
  PenSquare,
  Save,
  Share,
  Share2,
  Tag,
  Trash2,
} from "lucide-react";
import { getFetchById } from "../../service/getFetch";
import { formatDate } from "../../utils/helper";

function PostDetails() {
  const { categoryId, status, authorId, content, createdAt, title } =
    useLoaderData();
  return (
    <section className="post-details animate-fade-in">
      <Link to="/posts" className="back-link">
        <ArrowLeft size={20} />
        Back to Posts
      </Link>
      <header className="post-header">
        <div className="post-tags ">
          <div className="category-tag glass">
            <Tag size={16} />
            <span>Category {categoryId}</span>
          </div>

          <span className="status-tag published">{status}</span>
        </div>
        <h1>{title}</h1>

        <div className="post-meta-detailed">
          <div className="author-info">
            <span className="author-avatar-large">A</span>

            <div className="author-text">
              <h3 className="name">Author {authorId}</h3>
              <p className="role">Author Bio {authorId}</p>
            </div>
          </div>

          <div className="meta-divider"></div>
          <div className="publish-info">
            <div className="info-item">
              <Calendar size={16} />
              <span>{formatDate(createdAt)}</span>
            </div>

            <div className="info-item">
              <Clock size={16} />
              <span>6 min read</span>
            </div>
          </div>
        </div>
      </header>

      <div className="post-featured-image glass">
        <div className="image-placeholder">{title}</div>
      </div>

      <div className="post-body content-glass">
        <p>{content}</p>
      </div>

      <div className="post-toolbar glass">
        <div className="toolbar-main">
          <button className="toolbar-btn primary">
            <PenSquare size={16} />
            <span>Edit Article</span>
          </button>
          <button className="toolbar-btn danger">
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>

        <div className="meta-divider"></div>

        <div className="toolbar-actions">
          <button className="icon-btn">
            <Bookmark size={20} />
          </button>

          <button className="icon-btn">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <div className="author-footer-card glass">
        <div className="author-header">
          <span className="author-avatar-large">A</span>

          <div className="author-description">
            <h3>Written by Author {authorId}</h3>
            <p>Author Bio {authorId}</p>

            <Link className="author-link">View all posts this author</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export const loader = async ({ params }) => {
  const { postId } = params;
  const post = await getFetchById("posts", postId);
  return post;
};

export default PostDetails;
