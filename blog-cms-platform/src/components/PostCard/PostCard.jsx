import React from "react";
import "./PostCard.css";
import { ArrowRight, Clock, PenLine, Tag, Trash2 } from "lucide-react";
import { Form, Link, useParams } from "react-router-dom";
import { formatDate } from "../../utils/helper";
import { useSelector } from "react-redux";
import { getCategories } from "../../features/categories/categoriesSelector";
import { getAuthors } from "../../features/authors/authorsSelector";

function PostCard({ id, title, content, authorId, categoryId, createdAt }) {
  const { categories = [] } = useSelector(getCategories);
  const { authors = [] } = useSelector(getAuthors);

  const categoryName =
    categories.find((category) => String(category.id) === String(categoryId))
      ?.name ?? `Category ${categoryId}`;

  const authorName =
    authors.find((author) => String(author.id) === String(authorId))?.name ??
    `Author ${authorId}`;

  const authorAvatar = authorName.at(0).toUpperCase();

  const params = useParams();

  const isInCategoryPage = Boolean(params.categoryId);

  const handleDelete = (event) => {
    if (!window.confirm("Permanently delete this post?")) {
      event.preventDefault();
    }
  };

  return (
    <div className="post-card glass animate-slide-up">
      <div className="post-card-content">
        <div className="post-meta">
          <span className="post-category">
            <Tag size={12} />
            {categoryName}
          </span>
          <span className="post-date">
            <Clock size={12} />
            {formatDate(createdAt)}
          </span>
        </div>

        <Link to={`/posts/${id}`} className="post-title">
          {title}
        </Link>
        <p className="post-excerpt">
          {typeof content === "string"
            ? content.length > 100
              ? `${content.substring(0, 100)}...`
              : content
            : ""}
        </p>

        <div className="post-footer">
          <Link to={`/authors/${authorId}`} className="post-author">
            <span className="author-avatar">{authorAvatar}</span>
            {authorName}
          </Link>

          {isInCategoryPage ? (
            <Link to={`/posts/${id}`} className="read-more">
              Read More <ArrowRight size={16} />
            </Link>
          ) : (
            <div className="post-actions">
              <Link
                to={`/admin/posts/${id}/edit`}
                type="button"
                className="action-btn edit"
                aria-label="Edit post"
              >
                <PenLine size={16} />
              </Link>
              <Form method="post" action="/posts">
                <input type="hidden" name="intent" value="delete" />
                <input type="hidden" name="postId" value={id} />
                <button
                  type="submit"
                  className="action-btn delete"
                  aria-label="Delete post"
                  onClick={handleDelete}
                >
                  <Trash2 size={16} />
                </button>
              </Form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
