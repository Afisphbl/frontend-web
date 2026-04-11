/* eslint-disable react-refresh/only-export-components */

import {
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  Link,
} from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Eye,
  XCircle,
  Settings,
  Users,
  Layers,
} from "lucide-react";
import "./PostFormPage.css";
import { getFetch } from "../../service/getFetch";

export async function loader() {
  const [categories, authors] = await Promise.all([
    getFetch("categories"),
    getFetch("authors"),
  ]);

  return { categories, authors };
}

export async function action({ request }) {
  const formData = await request.formData();

  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "").trim();
  const authorId = String(formData.get("authorId") ?? "").trim();
  const status = String(formData.get("status") ?? "draft").trim();

  if (!title || !content || !categoryId || !authorId) {
    throw new Response("Invalid post data", { status: 400 });
  }

  const newPost = {
    title,
    content,
    categoryId,
    authorId,
    status,
    createdAt: new Date().toISOString(),
  };

  const createdPost = await getFetch("posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  return redirect(`/posts/${createdPost.id}`);
}

export function Component() {
  const { categories = [], authors = [] } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="admin-page animate-fade-in">
      <div className="admin-header">
        <Link to="/posts" className="back-link">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>
        <h1>Craft a New Story</h1>
      </div>

      <Form method="post" className="cms-form">
        <div className="form-layout">
          <main className="form-main glass">
            <div className="form-group large">
              <label htmlFor="title">Article Title</label>
              <input 
                name="title" 
                id="title" 
                placeholder="Enter a compelling title..." 
                autoFocus 
                required 
              />
            </div>

            <div className="form-group large">
              <label htmlFor="content">Story Content (Markdown supported)</label>
              <textarea 
                name="content" 
                id="content" 
                placeholder="Once upon a time..." 
                required 
              ></textarea>
            </div>
          </main>

          <aside className="form-sidebar">
            <div className="sidebar-widget glass">
              <h3><Settings size={18} /> Publishing</h3>
              
              <div className="form-group small">
                <label htmlFor="status">Post Status</label>
                <select name="status" id="status" defaultValue="draft">
                  <option value="draft">Draft (Private)</option>
                  <option value="published">Published (Public)</option>
                </select>
              </div>

              <div className="widget-actions">
                <button type="submit" className="btn-primary full" disabled={isSubmitting}>
                  <Send size={18} />
                  {isSubmitting ? "Publishing..." : "Publish Post"}
                </button>
                <button type="button" className="btn-secondary full">
                  <Eye size={18} />
                  Preview
                </button>
              </div>
            </div>

            <div className="sidebar-widget glass">
              <h3><Layers size={18} /> Classification</h3>
              <div className="form-group small">
                <label htmlFor="categoryId">Category</label>
                <select name="categoryId" id="categoryId" required>
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>

            <div className="sidebar-widget glass">
              <h3><Users size={18} /> Ownership</h3>
              <div className="form-group small">
                <label htmlFor="authorId">Assign Author</label>
                <select name="authorId" id="authorId" required>
                  <option value="">Select Author</option>
                  {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
            </div>

            <div className="discard-zone">
              <Link to="/posts" className="btn-link-danger">
                <XCircle size={16} />
                Discard Draft
              </Link>
            </div>
          </aside>
        </div>
      </Form>
    </div>
  );
}
