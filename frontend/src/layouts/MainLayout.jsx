import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 text-center text-xs text-slate-500">
        <p>&copy; 2026 HireHub AI &mdash; Where Talent Finds Opportunity &bull; All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
