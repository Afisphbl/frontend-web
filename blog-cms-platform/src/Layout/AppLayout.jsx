import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import "./AppLayout.css";
import { store } from "../app/store";
import { fetchPosts } from "../features/posts/postsSlice";
import { useSelector } from "react-redux";
import { getPosts } from "../features/posts/postsSelector";
import { fetchCategories } from "../features/categories/categoriesSlice";

function AppLayout() {
  const { status } = useSelector(getPosts);

  return (
    <div className="layout-container">
      {status === "loading" && <div className=".loading-bar"></div>}
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export async function loader() {
  store.dispatch(fetchPosts());
  store.dispatch(fetchCategories());
  return null;
}

export default AppLayout;
