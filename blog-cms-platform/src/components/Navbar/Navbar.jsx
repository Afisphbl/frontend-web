import { Link, NavLink } from "react-router-dom";
import {
  Feather,
  LayoutDashboard,
  Moon,
  PlusCircle,
  Sun,
  User,
} from "lucide-react";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "../../features/theme/themeSelector";
import { toggleTheme } from "../../features/theme/themeSlice";
import { useEffect } from "react";

function Navbar() {
  const theme = useSelector(getTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <header className="navbar glass">
      <div className="navbar-content">
        <Link to="/" className="logo">
          <Feather size={28} className="logo-icon" />
          <span className="logo-text">
            Aether<span>CMS</span>
          </span>
        </Link>

        <nav className="nav-links">
          <NavLink
            to="/posts"
            aria-label="Explore posts"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <LayoutDashboard size={18} />
            <span>Explore</span>
          </NavLink>
          <NavLink
            to="/admin/posts/new"
            aria-label="Create new post"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <PlusCircle size={18} />
            <span>New Post</span>
          </NavLink>
        </nav>

        <div className="navbar-actions">
          <button
            type="button"
            className="theme-toggle"
            aria-label="Toggle Theme"
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <div className="user-avatar glass">
            <User size={18} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
