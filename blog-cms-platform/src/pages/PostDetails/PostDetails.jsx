import React from "react";
import "./PostDetailsPage.css";
import { Link, useLoaderData } from "react-router-dom";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Clock,
  PenSquare,
  Share2,
  Tag,
  Trash2,
} from "lucide-react";
import { getFetchById } from "../../service/getFetch";
import { formatDate } from "../../utils/helper";
import { useSelector } from "react-redux";
import { getCategories } from "../../features/categories/categoriesSelector";
import Category from "../Category/Category";
import { getAuthors } from "../../features/authors/authorsSelector";

function PostDetails() {
  const { categoryId, status, authorId, content, createdAt, title } =
    useLoaderData();

  const { categories = [] } = useSelector(getCategories);
  const { authors = [] } = useSelector(getAuthors);

  const authorName =
    authors.find((author) => String(author.id) === String(authorId))?.name ??
    `Author ${authorId}`;

  const authorBio = authors.find(
    (author) => String(author.id) === String(authorId),
  )?.bio;

  const authorAvatar = authorName.at(0).toUpperCase();

  const categoryName =
    categories.find((category) => String(category.id) === String(categoryId))
      ?.name ?? `Category ${categoryId}`;
  return (
    <section className="post-details animate-fade-in">
      <Link to="/posts" className="back-link">
        <ArrowLeft size={20} />
        Back to Posts
      </Link>
      <header className="post-header">
        <div className="post-tags ">
          <Link to={`/categories/${categoryId}`} className="category-tag glass">
            <Tag size={16} />
            <span>{categoryName}</span>
          </Link>

          <span
            className={`status-tag ${String(status).toLowerCase() === "published" ? "published" : ""}`}
          >
            {status}
          </span>
        </div>
        <h1>{title}</h1>

        <div className="post-meta-detailed">
          <div className="author-info">
            <span className="author-avatar-large">{authorAvatar}</span>

            <div className="author-text">
              <h3 className="name">{authorName}</h3>
              <p className="role">{authorBio}</p>
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
          <button type="button" className="icon-btn" aria-label="Bookmark post">
            <Bookmark size={20} />
          </button>

          <button type="button" className="icon-btn" aria-label="Share post">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <div className="author-footer-card glass">
        <div className="author-header">
          <span className="author-avatar-large">A</span>

          <div className="author-description">
            <h3>Written by Author {authorName}</h3>
            <p>{authorBio}</p>

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
