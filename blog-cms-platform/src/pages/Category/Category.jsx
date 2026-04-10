import { Layers } from "lucide-react";
import "./CategoryPostsPage.css";
import { getFetchById } from "../../service/getFetch";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPosts } from "../../features/posts/postsSelector";
import PostCard from "../../components/PostCard/PostCard";

function Category() {
  const { id, name } = useLoaderData();
  const { posts } = useSelector(getPosts);
  const filteredPosts = (posts ?? []).filter(
    (post) => +post.categoryId === +id,
  );

  return (
    <section className="category-posts-page animate-fade-in">
      <div className="category-hero glass">
        <div className="category-icon-wrapper">
          <Layers size={48} />
        </div>
        <div className="category-label">Browse Category</div>
        <div className="category-hero-content">
          <h1>{name}</h1>
          <p>Discover the latest articles, guides, and stories in {name}.</p>
        </div>
      </div>

      <div className="archive-stats">
        <div className="stat-item glass">
          <span className="stat-value">{filteredPosts.length}</span>
          <span className="stat-label">Published Articles</span>
        </div>
      </div>

      <div className="posts-grid">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
}

export const loader = async ({ params }) => {
  const { categoryId } = params;

  const data = await getFetchById("categories", categoryId);

  return data;
};

export default Category;
