import React, { useState } from 'react';
import api from '../../services/api';
import { FiCpu, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ResumeAnalyzer = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const runAnalysis = async () => {
    try {
      setLoading(true);
      const res = await api.post('/ai/resume-analyze');
      setAnalysis(res.data.data);
      toast.success('Resume analysis completed!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error running analyzer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-100">AI Resume Analyzer</h1>
          <p className="text-xs text-slate-400 mt-0.5">Automated heuristic caliber benchmarking and technical keyword diagnostics</p>
        </div>
        <button onClick={runAnalysis} disabled={loading} className="btn-primary text-xs px-4 py-2.5">
          <FiCpu /> {loading ? 'Analyzing...' : 'Run Diagnostics'}
        </button>
      </div>

      {!analysis && !loading && (
        <div className="card-dark text-center py-16">
          <FiCpu className="w-12 h-12 mx-auto text-indigo-400 mb-3" />
          <h3 className="text-base font-bold text-slate-200">No Analysis Cached Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-4">
            Click 'Run Diagnostics' to evaluate your profile completeness, action verbs, keyword density, and technical skills against market standards.
          </p>
        </div>
      )}

      {analysis && (
        <div className="space-y-6">
          <div className="card-dark border-indigo-500/30 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Overall Resume Caliber Score</span>
              <p className="text-5xl font-black text-indigo-400 mt-2">{analysis.overallScore}<span className="text-2xl text-slate-500">/100</span></p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs w-full sm:w-auto">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">Technical Skills</span>
                <p className="text-base font-bold text-emerald-400 mt-1">{analysis.breakdown.skills}%</p>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">Experience Impact</span>
                <p className="text-base font-bold text-indigo-400 mt-1">{analysis.breakdown.experience}%</p>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">Keyword Index</span>
                <p className="text-base font-bold text-purple-400 mt-1">{analysis.breakdown.keywords}%</p>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">Profile Completeness</span>
                <p className="text-base font-bold text-cyan-400 mt-1">{analysis.breakdown.profileCompleteness}%</p>
              </div>
            </div>
          </div>

          <div className="card-dark p-6 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <FiCheckCircle className="text-emerald-400" /> Actionable Recommendations
            </h3>
            <div className="space-y-2">
              {analysis.recommendations.map((rec, i) => (
                <div key={i} className="p-3 bg-slate-950/40 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold shrink-0 text-[10px]">
                    {i + 1}
                  </span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 italic pt-2">{analysis.disclaimer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
