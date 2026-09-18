import React, { useState } from 'react';
import api from '../../services/api';
import { FiTrendingUp, FiArrowDown } from 'react-icons/fi';
import { toast } from 'react-toastify';

const CareerPathPage = () => {
  const [currentRole, setCurrentRole] = useState('Frontend Developer');
  const [targetRole, setTargetRole] = useState('Full Stack Developer');
  const [pathData, setPathData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post('/ai/career-path', { currentRole, targetRole });
      setPathData(res.data.data);
    } catch (err) {
      toast.error('Failed to generate career path');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-100">AI Career Path Generator</h1>
        <p className="text-xs text-slate-400 mt-0.5">Visualize progressive development milestones and project roadmaps</p>
      </div>

      <form onSubmit={handleGenerate} className="card-dark grid sm:grid-cols-3 gap-3">
        <input
          type="text"
          value={currentRole}
          onChange={(e) => setCurrentRole(e.target.value)}
          placeholder="Current Role (e.g. Frontend Developer)"
          className="input-dark text-xs"
        />
        <input
          type="text"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          placeholder="Target Role (e.g. Full Stack Developer)"
          className="input-dark text-xs"
        />
        <button type="submit" disabled={loading} className="btn-primary text-xs px-4 py-2.5">
          <FiTrendingUp /> {loading ? 'Mapping...' : 'Generate Roadmap'}
        </button>
      </form>

      {pathData && (
        <div className="card-dark space-y-8 p-6">
          <div className="text-center pb-4 border-b border-slate-800">
            <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Estimated Timeline</span>
            <h3 className="text-xl font-black text-slate-100 mt-0.5">{pathData.totalEstimatedDuration}</h3>
          </div>

          <div className="space-y-6 relative">
            {pathData.stages.map((stage, idx) => (
              <div key={idx} className="space-y-3">
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-slate-100 text-sm text-indigo-300">
                      Stage {idx + 1}: {stage.role}
                    </h4>
                    <span className="badge bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                      {stage.estimatedDuration}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400">Required Competencies:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {stage.requiredSkills.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[11px] rounded border border-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400">Suggested Portfolio Projects:</span>
                    <p className="text-xs text-slate-300 mt-0.5">{stage.suggestedProjects.join(', ')}</p>
                  </div>
                </div>

                {idx < pathData.stages.length - 1 && (
                  <div className="flex justify-center text-indigo-400">
                    <FiArrowDown size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 italic text-center pt-4">{pathData.disclaimer}</p>
        </div>
      )}
    </div>
  );
};

export default CareerPathPage;
