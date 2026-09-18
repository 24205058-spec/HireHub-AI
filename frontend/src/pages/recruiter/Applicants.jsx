import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { getStatusBadgeColor } from '../../utils/helpers';

const JobApplicants = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await api.get('/jobs/my-jobs');
        const list = res.data.data || [];
        setJobs(list);
        if (list.length > 0) {
          setSelectedJobId(list[0]._id);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  useEffect(() => {
    if (!selectedJobId) return;
    const loadApplicants = async () => {
      try {
        const res = await api.get(`/jobs/${selectedJobId}/applicants`);
        setApplicants(res.data.data || []);
      } catch (e) {
        console.error(e);
      }
    };
    loadApplicants();
  }, [selectedJobId]);

  const updateStatus = async (appId, status) => {
    try {
      await api.put(`/applications/${appId}/status`, { status });
      toast.success(`Application marked as ${status}`);
      setApplicants(applicants.map(a => a._id === appId ? { ...a, status } : a));
    } catch (e) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-100">Applicant Pipeline</h1>
        <p className="text-xs text-slate-400 mt-0.5">Review candidate submissions ranked by HireHub AI match scoring</p>
      </div>

      <div className="card-dark p-4">
        <label className="block text-xs font-semibold text-slate-300 mb-1">Select Job Position</label>
        <select
          value={selectedJobId}
          onChange={(e) => setSelectedJobId(e.target.value)}
          className="input-dark text-xs"
        >
          {jobs.map(j => (
            <option key={j._id} value={j._id}>
              {j.title} ({j.applicationCount || 0} applicants)
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {applicants.length === 0 ? (
          <div className="card-dark text-center py-12 text-xs text-slate-400">
            No applicants registered for this position yet.
          </div>
        ) : (
          applicants.map(app => (
            <div key={app._id} className="card-dark p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-100 text-sm">{app.candidateId?.name}</h3>
                  <span className="text-xs text-indigo-400 font-extrabold bg-indigo-950 px-2 py-0.5 rounded-full">
                    {app.matchScore}% Match
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{app.candidateId?.email}</p>
                {app.coverLetter && (
                  <p className="text-xs text-slate-300 mt-2 italic bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                    "{app.coverLetter}"
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <select
                  value={app.status}
                  onChange={(e) => updateStatus(app._id, e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold"
                >
                  <option value="applied">Applied</option>
                  <option value="under-review">Under Review</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interview">Interview</option>
                  <option value="selected">Selected</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobApplicants;
