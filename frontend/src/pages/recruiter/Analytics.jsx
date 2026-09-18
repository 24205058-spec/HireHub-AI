import React from 'react';
import { FiBarChart2 } from 'react-icons/fi';

const RecruiterAnalytics = () => {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-100">Recruitment Analytics</h1>
        <p className="text-xs text-slate-400 mt-0.5">High-level funnel velocity and candidate demographic metrics</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="card-dark text-center p-6">
          <span className="text-xs text-slate-400 font-bold uppercase">Time to Offer</span>
          <p className="text-3xl font-black text-indigo-400 mt-2">14 Days</p>
          <p className="text-[11px] text-emerald-400 mt-1">42% faster than industry standard</p>
        </div>
        <div className="card-dark text-center p-6">
          <span className="text-xs text-slate-400 font-bold uppercase">AI Match Accuracy</span>
          <p className="text-3xl font-black text-emerald-400 mt-2">91.4%</p>
          <p className="text-[11px] text-slate-500 mt-1">Based on recruiter acceptances</p>
        </div>
        <div className="card-dark text-center p-6">
          <span className="text-xs text-slate-400 font-bold uppercase">Reverse Hiring Yield</span>
          <p className="text-3xl font-black text-purple-400 mt-2">38%</p>
          <p className="text-[11px] text-purple-300 mt-1">Candidate-initiated hires</p>
        </div>
      </div>
    </div>
  );
};

export default RecruiterAnalytics;
