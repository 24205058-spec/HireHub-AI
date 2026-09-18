import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiBriefcase, FiUser, FiLogOut, FiMenu, FiX, FiLayers, FiZap } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import NotificationBell from './NotificationBell';

const Navbar = () => {
  const { user, isAuthenticated, logout, isCandidate, isRecruiter, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getDashboardLink = () => {
    if (isCandidate) return '/candidate/dashboard';
    if (isRecruiter) return '/recruiter/dashboard';
    if (isAdmin) return '/admin/dashboard';
    return '/';
  };

  return (
    <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              H
            </div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              HireHub <span className="text-indigo-400">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/jobs" className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
              <FiBriefcase className="text-indigo-400" /> Explore Jobs
            </Link>
            {isCandidate && (
              <>
                <Link to="/candidate/reverse-hiring" className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <FiZap className="text-amber-400" /> Reverse Hiring
                </Link>
                <Link to="/candidate/simulator" className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <FiLayers className="text-cyan-400" /> AI Simulator
                </Link>
              </>
            )}
            {isRecruiter && (
              <Link to="/recruiter/reverse-hiring" className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                <FiZap className="text-amber-400" /> Reverse Inquiries
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <NotificationBell />
                <Link to={getDashboardLink()} className="btn-secondary text-xs px-3.5 py-2">
                  <FiUser /> Dashboard
                </Link>
                <button onClick={() => { logout(); navigate('/'); }} className="text-slate-400 hover:text-rose-400 p-2 text-sm transition-colors" title="Logout">
                  <FiLogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white px-3 py-2">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary text-xs px-4 py-2">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <div className="flex md:hidden items-center gap-2">
            {isAuthenticated && <NotificationBell />}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-400 hover:text-white">
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <Link to="/jobs" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-white font-medium">Explore Jobs</Link>
          {isAuthenticated ? (
            <>
              <Link to={getDashboardLink()} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-indigo-400 font-medium">My Dashboard</Link>
              <button onClick={() => { logout(); setMobileMenuOpen(false); navigate('/'); }} className="w-full text-left py-2 text-rose-400 font-medium flex items-center gap-2">
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn-secondary text-center py-2">Sign In</Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn-primary text-center py-2">Get Started</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
