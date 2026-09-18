import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

const RecruiterJobs = () => {
  const [jobs, setJobs] = useState([]);

  const load = async () => {
    try {
      const res = await api.get('/jobs/my-jobs');
      setJobs(res.data.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job?')) return;
    try {
      await api.delete(`/jobs/${id}`);
      toast.success('Job removed');
      load();
    } catch (e) {
      toast.error('Failed to delete job');
    }
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-100">Posted Positions</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage live job listings and quality ratings</p>
        </div>
        <Link to="/recruiter/jobs/create" className="btn-primary text-xs px-4 py-2">
          <FiPlus /> New Job
        </Link>
      </div>

      <div className="space-y-3">
        {jobs.map(j => (
          <div key={j._id} className="card-dark p-4 flex items-center justify-between text-xs">
            <div>
              <h3 className="font-bold text-slate-100 text-sm">{j.title}</h3>
              <p className="text-slate-400 mt-0.5">{j.location} &bull; Quality Score: <strong className="text-indigo-400">{j.qualityScore || 80}/100</strong></p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/recruiter/applicants" className="btn-secondary text-xs px-3 py-1.5 font-semibold">
                Applicants ({j.applicationCount || 0})
              </Link>
              <button onClick={() => handleDelete(j._id)} className="text-rose-400 hover:text-rose-300 p-1.5">
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruiterJobs;
