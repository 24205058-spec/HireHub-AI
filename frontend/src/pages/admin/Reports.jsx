import React from 'react';
import { FiExternalLink } from 'react-icons/fi';

const AdminReports = () => {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-100">Server-Side Rendered (SSR) Reports</h1>
        <p className="text-xs text-slate-400 mt-0.5">Direct Node.js + Express + EJS server rendering integration</p>
      </div>

      <div className="card-dark p-8 text-center space-y-4">
        <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
          HireHub AI incorporates an Express-powered server-side rendering pipeline utilizing EJS templates to produce live executive platform audits.
        </p>
        <a
          href="http://localhost:5000/api/admin/reports"
          target="_blank"
          rel="noreferrer"
          className="btn-primary text-xs px-5 py-2.5 inline-flex"
        >
          View Live EJS SSR Report <FiExternalLink />
        </a>
      </div>
    </div>
  );
};

export default AdminReports;
