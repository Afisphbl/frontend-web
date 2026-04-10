import React from "react";
import "./PostCard.css";
import { Clock, PenLine, Tag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/helper";

function PostCard({ title, content, authorId, categoryId, createdAt }) {
  return (
    <div className="post-card glass animate-slide-up">
      <div className="post-card-content">
        <div className="post-meta">
          <span className="post-category">
            <Tag size={12} />
            {`Category ${categoryId}`}
          </span>
          <span className="post-date">
            <Clock size={12} />
            {formatDate(createdAt)}
          </span>
        </div>

        <h1 className="post-title">{title}</h1>
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
        </div>
      </div>
    </div>
  );
}

export default PostCard;
