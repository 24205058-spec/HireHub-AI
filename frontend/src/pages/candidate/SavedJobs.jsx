import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import JobCard from '../../components/JobCard';

const SavedJobs = () => {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await api.get('/applications/saved');
        setSaved(res.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, []);

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-100">Saved Opportunities</h1>
        <p className="text-xs text-slate-400 mt-0.5">Bookmarked job listings saved for review</p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-500">Loading saved jobs...</div>
      ) : saved.length === 0 ? (
        <div className="card-dark text-center py-16 text-xs text-slate-400">
          No saved jobs bookmarked currently.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {saved.map((item) => (
            item.jobId && <JobCard key={item._id} job={item.jobId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
