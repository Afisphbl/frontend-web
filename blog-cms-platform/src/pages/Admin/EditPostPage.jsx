/* eslint-disable react-refresh/only-export-components */

import {
  Form,
  Link,
  redirect,
  useNavigation,
  useParams,
} from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Eye,
  Trash2,
  Settings,
  Users,
  Layers,
} from "lucide-react";
import "./PostFormPage.css"; // Reuse form styles
import { useSelector } from "react-redux";
import { getPosts } from "../../features/posts/postsSelector";
import { getCategories } from "../../features/categories/categoriesSelector";
import { getAuthors } from "../../features/authors/authorsSelector";
import { getFetch } from "../../service/getFetch";

export function Component() {
  const { posts = [] } = useSelector(getPosts);
  const { categories = [] } = useSelector(getCategories);
  const { authors = [] } = useSelector(getAuthors);
  const { postId } = useParams();
  const navigation = useNavigation();
  const post = posts.find((p) => String(p.id) === String(postId));

  const isSubmitting = navigation.state === "submitting";
  const intent = navigation.formData?.get("intent");
  const isDeleting = isSubmitting && intent === "delete";
  const isSaving = isSubmitting && intent !== "delete";

  const handleDelete = (event) => {
    if (!window.confirm("Permanently delete this post?")) {
      event.preventDefault();
    }
  };

  if (!post) {
    return (
      <div className="admin-page animate-fade-in">
        <div className="admin-header">
          <Link to="/posts" className="back-link">
            <ArrowLeft size={18} />
            Back to Posts
          </Link>
          <h1>Post not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page animate-fade-in">
      <div className="admin-header">
        <Link to={`/posts/${post.id}`} className="back-link">
          <ArrowLeft size={18} />
          Back to Article
        </Link>
        <h1>
          Edit Story <span>#{post.id}</span>
        </h1>
      </div>

      <Form method="post" className="cms-form">
        <div className="form-layout">
          <main className="form-main glass">
            <div className="form-group large">
              <label htmlFor="title">Article Title</label>
              <input
                name="title"
                id="title"
                defaultValue={post.title}
                placeholder="Enter a compelling title..."
                required
              />
            </div>

            <div className="form-group large">
              <label htmlFor="content">Story Content</label>
              <textarea
                name="content"
                id="content"
                defaultValue={post.content}
                placeholder="Content goes here..."
                required
              ></textarea>
            </div>
          </main>

          <aside className="form-sidebar">
            <div className="sidebar-widget glass">
              <h3>
                <Settings size={18} /> Review & Save
              </h3>

              <div className="form-group small">
                <label htmlFor="status">Post Status</label>
                <select name="status" id="status" defaultValue={post.status}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="widget-actions">
                <button
                  type="submit"
                  className="btn-primary full"
                  name="intent"
                  value="save"
                  disabled={isSubmitting}
                >
                  <Save size={18} />
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
                <Link to={`/posts/${post.id}`} className="btn-secondary full">
                  <Eye size={18} />
                  View Current
                </Link>
              </div>
            </div>

            <div className="sidebar-widget glass">
              <h3>
                <Layers size={18} /> Classification
              </h3>
              <div className="form-group small">
                <label htmlFor="categoryId">Category</label>
                <select
                  name="categoryId"
                  id="categoryId"
                  defaultValue={post.categoryId}
                  required
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sidebar-widget glass">
              <h3>
                <Users size={18} /> Ownership
              </h3>
              <div className="form-group small">
                <label htmlFor="authorId">Author</label>
                <select
                  name="authorId"
                  id="authorId"
                  defaultValue={post.authorId}
                  required
                >
                  {authors.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="danger-zone glass">
              <h3>Danger Zone</h3>
              <p>Deleting a post is permanent and cannot be undone.</p>
              <button
                type="submit"
                className="btn-secondary full danger-text"
                name="intent"
                value="delete"
                formNoValidate
                onClick={handleDelete}
                disabled={isSubmitting}
              >
                <Trash2 size={16} />
                {isDeleting ? "Deleting..." : "Delete Post"}
              </button>
            </div>
          </aside>
        </div>
      </Form>
    </div>
  );
}

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const { postId } = params;

  if (!postId) {
    throw new Response("Post id is required", { status: 400 });
  }

  if (intent === "delete") {
    await getFetch(`posts/${encodeURIComponent(String(postId))}`, {
      method: "DELETE",
    });

    return redirect("/posts");
  }

  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "").trim();
  const authorId = String(formData.get("authorId") ?? "").trim();
  const status = String(formData.get("status") ?? "draft").trim();

  if (!title || !content || !categoryId || !authorId) {
    throw new Response("Invalid post data", { status: 400 });
  }

  await getFetch(`posts/${encodeURIComponent(String(postId))}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      categoryId,
      authorId,
      status,
    }),
  });

  return redirect(`/posts/${postId}`);
};
