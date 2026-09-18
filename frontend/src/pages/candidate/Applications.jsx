import React, { useEffect } from 'react';
import { useApplications } from '../../hooks/useApplications';
import { getStatusBadgeColor, formatDate } from '../../utils/helpers';
import { Link } from 'react-router-dom';

const Applications = () => {
  const { applications, loading, getApplications } = useApplications();

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-100">My Applications</h1>
        <p className="text-xs text-slate-400 mt-0.5">Track your active recruitment pipeline and status progression</p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-500">Loading applications...</div>
      ) : applications.length === 0 ? (
        <div className="card-dark text-center py-16">
          <p className="text-xs text-slate-400">You have not submitted applications yet.</p>
          <Link to="/jobs" className="btn-primary text-xs px-4 py-2 mt-4 inline-flex">Explore Jobs</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app._id} className="card-dark p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-indigo-400 font-bold uppercase">{app.jobId?.companyId?.companyName || 'Enterprise'}</span>
                <h3 className="text-base font-bold text-slate-100 mt-0.5">{app.jobId?.title || 'Position'}</h3>
                <p className="text-xs text-slate-400 mt-1">Applied on {formatDate(app.appliedAt)} &bull; {app.matchScore}% Match</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`badge capitalize ${getStatusBadgeColor(app.status)}`}>
                  {app.status}
                </span>
                <Link to={`/jobs/${app.jobId?._id}`} className="btn-secondary text-xs px-3 py-1.5 font-semibold">
                  View Job
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
