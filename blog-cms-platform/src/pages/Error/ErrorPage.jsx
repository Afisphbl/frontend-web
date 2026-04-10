import { useRouteError, Link } from "react-router-dom";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";
import "./ErrorPage.css";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page animate-fade-in">
      <div className="error-content glass">
        <div className="error-icon">
          <AlertCircle size={64} color="var(--accent-primary)" />
        </div>
        <h1>Oops! Something went wrong</h1>
        <p className="error-message">
          {error.statusText || error.message || "An unexpected error occurred while processing your request."}
        </p>
        <div className="error-actions">
          <button onClick={() => window.history.back()} className="btn-secondary">
            <ArrowLeft size={18} />
            Go Back
          </button>
          <Link to="/" className="btn-primary">
            <Home size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
