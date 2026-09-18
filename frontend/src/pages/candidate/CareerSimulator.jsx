import React, { useState } from 'react';
import api from '../../services/api';
import { FiCpu, FiPlus, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

const CareerSimulator = () => {
  const [skillInput, setSkillInput] = useState('');
  const [skillsToAdd, setSkillsToAdd] = useState(['Node.js', 'Docker']);
  const [simData, setSimData] = useState(null);
  const [loading, setLoading] = useState(false);

  const addSkill = () => {
    if (skillInput.trim() && !skillsToAdd.includes(skillInput.trim())) {
      setSkillsToAdd([...skillsToAdd, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (s) => {
    setSkillsToAdd(skillsToAdd.filter(item => item !== s));
  };

  const runSimulation = async () => {
    if (skillsToAdd.length === 0) {
      toast.error('Add at least one skill to simulate.');
      return;
    }
    try {
      setLoading(true);
      const res = await api.post('/ai/simulator', { skillsToAdd });
      setSimData(res.data.data);
    } catch (err) {
      toast.error('Simulation calculation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-100">What-If Career Simulator</h1>
        <p className="text-xs text-slate-400 mt-0.5">Explore how acquiring specific skills alters your market compatibility</p>
      </div>

      <div className="card-dark space-y-4">
        <label className="block text-xs font-semibold text-slate-300">Hypothetical Skills to Acquire</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="e.g. AWS, Kubernetes, GraphQL"
            className="input-dark text-xs"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
          />
          <button type="button" onClick={addSkill} className="btn-secondary text-xs px-4">
            <FiPlus /> Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {skillsToAdd.map((s) => (
            <span key={s} className="badge bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 flex items-center gap-1.5 py-1 px-3">
              {s}
              <button type="button" onClick={() => removeSkill(s)} className="hover:text-rose-400">
                <FiTrash2 size={12} />
              </button>
            </span>
          ))}
        </div>

        <div className="pt-2">
          <button onClick={runSimulation} disabled={loading} className="btn-primary text-xs px-5 py-2.5">
            <FiCpu /> {loading ? 'Running AI Model...' : 'Simulate Career Impact'}
          </button>
        </div>
      </div>

      {simData && (
        <div className="card-dark space-y-6">
          <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-500/30">
            <h3 className="font-bold text-sm text-indigo-300">Simulation Summary</h3>
            <p className="text-xs text-slate-200 mt-1">{simData.summary}</p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-xs text-slate-300 uppercase tracking-wider">Role Compatibility Shifts</h4>
            <div className="space-y-3">
              {simData.finalScores.map((item, i) => (
                <div key={i} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-100">{item.role}</span>
                    <div className="text-slate-400 mt-0.5">
                      Base: <span className="text-slate-300 font-semibold">{item.currentCompatibility}%</span> &rarr; Simulated:{' '}
                      <span className="text-emerald-400 font-bold">{item.finalCompatibility}%</span>
                    </div>
                  </div>
                  {item.improvement > 0 && (
                    <span className="badge bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-extrabold">
                      +{item.improvement}% Gain
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-slate-500 italic">{simData.disclaimer}</p>
        </div>
      )}
    </div>
  );
};

export default CareerSimulator;
