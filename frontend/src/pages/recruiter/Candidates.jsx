import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { FiTarget, FiZap } from 'react-icons/fi';

const CandidatesList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await api.get('/profile/candidates');
        setCandidates(res.data.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-100">AI Candidate Discovery</h1>
        <p className="text-xs text-slate-400 mt-0.5">Search verified talent profiles across the HireHub AI ecosystem</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {candidates.map(c => (
          <div key={c._id} className="card-dark p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-100 text-sm">{c.userId?.name}</h3>
                <p className="text-xs text-indigo-400 mt-0.5">{c.headline || c.currentRole || 'Software Professional'}</p>
                <p className="text-xs text-slate-400 mt-0.5">{c.location || 'Remote'} &bull; {c.yearsOfExperience || 0} years exp</p>
              </div>
              <span className="badge bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Verified
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(c.skills || []).slice(0, 6).map((s, i) => (
                <span key={i} className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[11px] rounded">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidatesList;
