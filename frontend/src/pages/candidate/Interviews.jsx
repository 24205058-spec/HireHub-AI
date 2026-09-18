import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { FiCalendar, FiVideo } from 'react-icons/fi';
import { formatDate } from '../../utils/helpers';

const Interviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await api.get('/interviews/my');
        setInterviews(res.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchInterviews();
  }, []);

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-100">Upcoming Interviews</h1>
        <p className="text-xs text-slate-400 mt-0.5">Manage your scheduled interviews and virtual meeting rooms</p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-500">Loading interview schedule...</div>
      ) : interviews.length === 0 ? (
        <div className="card-dark text-center py-16 text-xs text-slate-400">
          No interviews scheduled currently.
        </div>
      ) : (
        <div className="space-y-4">
          {interviews.map((item) => (
            <div key={item._id} className="card-dark p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-indigo-400 font-bold uppercase">{item.type} Screening</span>
                <h3 className="text-base font-bold text-slate-100 mt-0.5">{item.jobId?.title || 'Technical Interview'}</h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <FiCalendar /> {item.date} &bull; {item.time}
                </p>
              </div>
              {item.meetingLink && (
                <a
                  href={item.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-xs px-4 py-2"
                >
                  <FiVideo /> Join Meeting
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Interviews;
