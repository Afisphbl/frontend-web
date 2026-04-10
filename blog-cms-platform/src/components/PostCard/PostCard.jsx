import React from "react";
import "./PostCard.css";
import { ArrowRight, Clock, PenLine, Tag, Trash2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../../utils/helper";
import { useSelector } from "react-redux";
import { getCategories } from "../../features/categories/categoriesSelector";

function PostCard({ id, title, content, authorId, categoryId, createdAt }) {
  const { categories } = useSelector(getCategories);

  const { name } = categories.find((category) => category.id === categoryId);
  const params = useParams();
  const isInCategoryPage = Boolean(params.categoryId);
  console.log(isInCategoryPage);
  return (
    <div className="post-card glass animate-slide-up">
      <div className="post-card-content">
        <div className="post-meta">
          <span className="post-category">
            <Tag size={12} />
            {name}
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
          <Link className="post-author">
            <span className="author-avatar">A</span>
            {`Author ${authorId}`}
          </Link>

          {isInCategoryPage ? (
            <Link to={`/posts/${id}`} className="read-more">
              Read More <ArrowRight size={16} />
            </Link>
          ) : (
            <div className="post-actions">
              <button
                type="button"
                className="action-btn edit"
                aria-label="Edit post"
              >
                <PenLine size={16} />
              </button>
              <button
                type="button"
                className="action-btn delete"
                aria-label="Delete post"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
