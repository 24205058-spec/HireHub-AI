import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiBriefcase, FiDollarSign, FiZap } from 'react-icons/fi';
import { formatSalary } from '../utils/helpers';

const JobCard = ({ job, matchScore }) => {
  const companyName = job.companyId?.companyName || 'Enterprise Partner';

  return (
    <div className="card-dark hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <span className="text-xs font-semibold text-indigo-400 tracking-wide uppercase">
              {companyName}
            </span>
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-300 transition-colors mt-0.5">
              {job.title}
            </h3>
          </div>
          {matchScore !== undefined && (
            <div className="flex items-center gap-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded-full text-xs font-extrabold shrink-0">
              <FiZap /> {matchScore}% AI Match
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-slate-400 mb-4">
          <span className="flex items-center gap-1"><FiMapPin /> {job.location || 'Remote'}</span>
          <span className="flex items-center gap-1"><FiBriefcase /> {job.workMode || 'Hybrid'}</span>
          <span className="flex items-center gap-1"><FiDollarSign /> {formatSalary(job.salary)}</span>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {(job.skills || []).slice(0, 4).map((s, i) => (
            <span key={i} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-700/60">
              {s}
            </span>
          ))}
          {(job.skills || []).length > 4 && (
            <span className="px-2 py-0.5 rounded-md bg-slate-800/40 text-slate-500 text-[11px]">
              +{(job.skills || []).length - 4} more
            </span>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 font-medium capitalize">
          {job.jobType || 'Full-time'}
        </span>
        <Link to={`/jobs/${job._id}`} className="btn-secondary text-xs px-3 py-1.5 font-semibold">
          View &amp; Match
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
