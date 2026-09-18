import React, { useState } from 'react';
import api from '../../services/api';
import { FiTarget, FiCheck, FiX, FiBookOpen } from 'react-icons/fi';
import { toast } from 'react-toastify';

const SkillGapPage = () => {
  const [targetJob, setTargetJob] = useState('Full Stack Developer');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post('/ai/skill-gap', { targetJob });
      setResult(res.data.data);
    } catch (err) {
      toast.error('Failed to compute skill gap');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-100">AI Skill Gap Analyzer</h1>
        <p className="text-xs text-slate-400 mt-0.5">Compare your existing competencies against target role benchmarks</p>
      </div>

      <form onSubmit={handleAnalyze} className="card-dark flex flex-col sm:flex-row gap-3">
        <select
          value={targetJob}
          onChange={(e) => setTargetJob(e.target.value)}
          className="input-dark text-xs flex-1"
        >
          <option value="Full Stack Developer">Full Stack Developer</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="DevOps Engineer">DevOps Engineer</option>
          <option value="Data Scientist">Data Scientist</option>
          <option value="Cloud Architect">Cloud Architect</option>
          <option value="Mobile Developer">Mobile Developer</option>
          <option value="Machine Learning Engineer">Machine Learning Engineer</option>
        </select>
        <button type="submit" disabled={loading} className="btn-primary text-xs px-5 py-2.5 shrink-0">
          <FiTarget /> {loading ? 'Computing...' : 'Analyze Gaps'}
        </button>
      </form>

      {result && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-dark border-emerald-500/30 space-y-3">
              <h3 className="font-bold text-sm text-emerald-400 flex items-center gap-2">
                <FiCheck /> Already Mastered ({result.alreadyHave.length})
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {result.alreadyHave.map((s, i) => (
                  <span key={i} className="badge bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-dark border-rose-500/30 space-y-3">
              <h3 className="font-bold text-sm text-rose-400 flex items-center gap-2">
                <FiX /> Missing Competencies ({result.missing.length})
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {result.missing.map((s, i) => (
                  <span key={i} className="badge bg-rose-500/15 text-rose-300 border border-rose-500/30">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="card-dark space-y-4">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <FiBookOpen className="text-indigo-400" /> Recommended Learning Path
            </h3>
            <div className="space-y-3">
              {result.learningPath.map((step) => (
                <div key={step.step} className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide">Step {step.step} &bull; {step.estimatedDuration}</span>
                    <h4 className="font-bold text-slate-100 text-sm mt-0.5">{step.skill}</h4>
                    <p className="text-slate-400 mt-1">Recommended resources: {step.resources.join(', ')}</p>
                  </div>
                  <span className={`badge px-3 py-1 font-bold shrink-0 self-start sm:self-auto ${
                    step.priority === 'High' ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30' : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  }`}>
                    {step.priority} Priority
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillGapPage;
