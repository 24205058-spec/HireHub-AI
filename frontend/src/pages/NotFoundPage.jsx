import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-black text-indigo-500 mb-2">404</h1>
      <h2 className="text-xl font-bold text-slate-100 mb-2">Page Not Found</h2>
      <p className="text-xs text-slate-400 mb-6">The requested platform resource does not exist or has been relocated.</p>
      <Link to="/" className="btn-primary text-xs px-5 py-2.5">
        Return Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
