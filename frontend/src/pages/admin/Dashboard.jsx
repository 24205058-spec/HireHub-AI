import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { FiUsers, FiBriefcase, FiFileText, FiCalendar, FiFile } from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/stats');
        setStats(res.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-100">System Administration</h1>
          <p className="text-xs text-slate-400 mt-0.5">Platform governance, metrics, and server report generation</p>
        </div>
        <a
          href="http://localhost:5000/api/admin/reports"
          target="_blank"
          rel="noreferrer"
          className="btn-primary text-xs px-4 py-2"
        >
          <FiFile /> Open Server SSR Report (EJS)
        </a>
      </div>

      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="card-dark">
            <span className="text-xs text-slate-400">Total Registered Users</span>
            <p className="text-2xl font-black text-indigo-400 mt-1">{stats.users}</p>
          </div>
          <div className="card-dark">
            <span className="text-xs text-slate-400">Candidate Profiles</span>
            <p className="text-2xl font-black text-emerald-400 mt-1">{stats.candidates}</p>
          </div>
          <div className="card-dark">
            <span className="text-xs text-slate-400">Recruiter Profiles</span>
            <p className="text-2xl font-black text-purple-400 mt-1">{stats.recruiters}</p>
          </div>
          <div className="card-dark">
            <span className="text-xs text-slate-400">Active Job Postings</span>
            <p className="text-2xl font-black text-cyan-400 mt-1">{stats.jobs}</p>
          </div>
          <div className="card-dark">
            <span className="text-xs text-slate-400">Applications Recorded</span>
            <p className="text-2xl font-black text-amber-400 mt-1">{stats.applications}</p>
          </div>
          <div className="card-dark">
            <span className="text-xs text-slate-400">Interviews Scheduled</span>
            <p className="text-2xl font-black text-rose-400 mt-1">{stats.interviews}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
