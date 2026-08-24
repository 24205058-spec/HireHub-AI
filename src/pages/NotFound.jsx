import { Link } from "react-router-dom";
export default function NotFound() {
  return <div className="empty-state page-empty"><h1>404</h1><h3>Page not found</h3><p>The page you're looking for doesn't exist.</p><Link className="btn btn-primary" to="/">Back home</Link></div>;
}