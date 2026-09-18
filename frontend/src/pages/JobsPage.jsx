import React, { useEffect, useState } from 'react';
import { useJobs } from '../hooks/useJobs';
import JobCard from '../components/JobCard';
import { FiSearch, FiFilter } from 'react-icons/fi';

const JobsPage = () => {
  const { jobs, total, loading, getJobs } = useJobs();
  const [keyword, setKeyword] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [jobType, setJobType] = useState('');

  useEffect(() => {
    getJobs({ keyword, workMode, jobType });
  }, [workMode, jobType]);

  const handleSearch = (e) => {
    e.preventDefault();
    getJobs({ keyword, workMode, jobType });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-100">Explore Open Positions</h1>
          <p className="text-xs text-slate-400 mt-0.5">Found {total} active opportunities</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <FiSearch className="absolute left-3.5 top-3 text-slate-500 text-sm" />
            <input
              type="text"
              placeholder="Search by title, skill, or keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="input-dark pl-9 text-xs"
            />
          </div>
          <button type="submit" className="btn-primary text-xs px-4">
            Search
          </button>
        </form>
      </div>

      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
        <select
          value={workMode}
          onChange={(e) => setWorkMode(e.target.value)}
          className="bg-slate-900 border border-slate-800 text-slate-300 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none"
        >
          <option value="">All Work Modes</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="on-site">On-site</option>
        </select>

        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="bg-slate-900 border border-slate-800 text-slate-300 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none"
        >
          <option value="">All Job Types</option>
          <option value="full-time">Full-time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-xs text-slate-500">Querying positions...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="card-dark text-center py-16">
          <p className="text-sm text-slate-400">No jobs match your search criteria.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsPage;
