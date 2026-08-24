import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bell, BriefcaseBusiness, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dark, setDark] = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const dashboard = user?.role === "recruiter" ? "/recruiter" : "/candidate";

  const signOut = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  return (
    <header className="navbar">
      <div className="nav-inner container">
        <Link className="brand" to="/">
          <span className="brand-mark"><BriefcaseBusiness size={20} /></span>
          HireHub<span>AI</span>
        </Link>

        <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>

        <nav className={`nav-links ${open ? "show" : ""}`}>
          <NavLink to="/jobs" onClick={() => setOpen(false)}>Find Jobs</NavLink>
          {user && <NavLink to={dashboard} onClick={() => setOpen(false)}>Dashboard</NavLink>}
          {user && <NavLink to="/applications" onClick={() => setOpen(false)}>Applications</NavLink>}
          <NavLink to="/resume-analyzer" onClick={() => setOpen(false)}>AI Resume</NavLink>
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" onClick={() => setDark(!dark)} title="Toggle theme">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {user && <button className="icon-btn"><Bell size={18} /></button>}
          {user ? (
            <button className="avatar-btn" onClick={signOut} title="Sign out">
              {user.name.charAt(0).toUpperCase()}
            </button>
          ) : (
            <>
              <Link className="btn btn-ghost" to="/login">Sign in</Link>
              <Link className="btn btn-primary" to="/register">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}