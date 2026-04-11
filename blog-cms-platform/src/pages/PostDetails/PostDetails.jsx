import React from "react";
import "./PostDetailsPage.css";
import { Form, Link, redirect, useLoaderData, useNavigation } from "react-router-dom";
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
import { getFetch, getFetchById } from "../../service/getFetch";
import { formatDate } from "../../utils/helper";
import { useSelector } from "react-redux";
import { getCategories } from "../../features/categories/categoriesSelector";
import { getAuthors } from "../../features/authors/authorsSelector";

function PostDetails() {
  const { id, categoryId, status, authorId, content, createdAt, title } =
    useLoaderData();
  const navigation = useNavigation();

  const { categories = [] } = useSelector(getCategories);
  const { authors = [] } = useSelector(getAuthors);

  const isDeleting =
    navigation.state === "submitting" &&
    navigation.formData?.get("intent") === "delete";

  const handleDelete = (event) => {
    if (!window.confirm("Permanently delete this post?")) {
      event.preventDefault();
    }
  };

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
          <Link to={`/authors/${authorId}`} className="author-info">
            <span className="author-avatar-large">{authorAvatar}</span>

            <div className="author-text">
              <h3 className="name">{authorName}</h3>
              <p className="role">{authorBio}</p>
            </div>
          </Link>

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
          <Link to={`/admin/posts/${id}/edit`} className="toolbar-btn primary">
            <PenSquare size={16} />
            <span>Edit Article</span>
          </Link>

          <Form method="post" className="toolbar-delete-form">
            <button
              type="submit"
              className="toolbar-btn danger"
              name="intent"
              value="delete"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash2 size={16} />
              <span>{isDeleting ? "Deleting..." : "Delete"}</span>
            </button>
          </Form>
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
          <span className="author-avatar-large">{authorAvatar}</span>

          <div className="author-description">
            <h3>Written by Author {authorName}</h3>
            <p>{authorBio}</p>

            <Link to={`/authors/${authorId}`} className="author-link">
              View all posts by this author
            </Link>
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

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const { postId } = params;

  if (!postId) {
    throw new Response("Post id is required", { status: 400 });
  }

  if (intent !== "delete") {
    throw new Response("Invalid action", { status: 400 });
  }

  await getFetch(`posts/${encodeURIComponent(String(postId))}`, {
    method: "DELETE",
  });

  return redirect("/posts");
};

export default PostDetails;
