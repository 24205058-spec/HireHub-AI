import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { FiPlusCircle, FiUsers, FiFileText, FiRepeat, FiBarChart2 } from 'react-icons/fi';

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [reverseReqs, setReverseReqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [jRes, rRes] = await Promise.all([
          api.get('/jobs/my-jobs'),
          api.get('/reverse-hiring/recruiter-requests'),
        ]);
        setJobs(jRes.data.data || []);
        setReverseReqs(rRes.data.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="p-8 text-slate-500">Loading recruiter portal...</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-100">Recruiter Control Center</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage pipeline, active listings, and reverse hiring inquiries</p>
        </div>
        <Link to="/recruiter/jobs/create" className="btn-primary text-xs px-4 py-2.5">
          <FiPlusCircle /> Post Position (AI Quality Check)
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card-dark border-indigo-500/20">
          <span className="text-xs text-slate-400">Active Listings</span>
          <p className="text-2xl font-black text-indigo-400 mt-1">{jobs.length}</p>
        </div>
        <div className="card-dark border-emerald-500/20">
          <span className="text-xs text-slate-400">Total Applicants</span>
          <p className="text-2xl font-black text-emerald-400 mt-1">
            {jobs.reduce((acc, j) => acc + (j.applicationCount || 0), 0)}
          </p>
        </div>
        <div className="card-dark border-amber-500/20">
          <span className="text-xs text-slate-400">Reverse Hiring Requests</span>
          <p className="text-2xl font-black text-amber-400 mt-1">{reverseReqs.length}</p>
        </div>
        <div className="card-dark border-purple-500/20">
          <span className="text-xs text-slate-400">Avg Job Quality Score</span>
          <p className="text-2xl font-black text-purple-400 mt-1">
            {jobs.length > 0 ? Math.round(jobs.reduce((acc, j) => acc + (j.qualityScore || 80), 0) / jobs.length) : 88}/100
          </p>
        </div>
      </div>

      {/* Recruiter Quick Hub */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-dark space-y-4">
          <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
            <FiFileText className="text-indigo-400" /> Active Job Postings
          </h3>
          <div className="space-y-3">
            {jobs.slice(0, 4).map(j => (
              <div key={j._id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-100">{j.title}</h4>
                  <p className="text-slate-400 mt-0.5">{j.location} &bull; {j.applicationCount || 0} applicants</p>
                </div>
                <Link to="/recruiter/applicants" className="btn-secondary text-xs px-2.5 py-1">
                  View Pipeline
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="card-dark space-y-4">
          <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
            <FiRepeat className="text-amber-400" /> Incoming Reverse Hiring Inquiries
          </h3>
          <div className="space-y-3">
            {reverseReqs.length === 0 ? (
              <p className="text-xs text-slate-500">No active incoming inquiries.</p>
            ) : (
              reverseReqs.slice(0, 4).map(r => (
                <div key={r._id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-100">{r.candidateId?.name}</h4>
                    <p className="text-slate-400 mt-0.5 line-clamp-1">"{r.message}"</p>
                  </div>
                  <Link to="/recruiter/reverse-hiring" className="btn-secondary text-xs px-2.5 py-1 text-amber-300">
                    Review
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
