import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { getStatusBadgeColor } from '../../utils/helpers';

const ReverseHiringRecruiter = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    try {
      const res = await api.get('/reverse-hiring/recruiter-requests');
      setRequests(res.data.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleUpdate = async (id, status) => {
    try {
      await api.put(`/reverse-hiring/${id}`, { status });
      toast.success(`Request marked as ${status}`);
      loadRequests();
    } catch (e) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-100">Reverse Hiring Inquiries</h1>
        <p className="text-xs text-slate-400 mt-0.5">Candidates expressing direct interest in your organization</p>
      </div>

      <div className="space-y-4">
        {requests.length === 0 ? (
          <div className="card-dark text-center py-16 text-xs text-slate-400">
            No incoming candidate inquiries at present.
          </div>
        ) : (
          requests.map(req => (
            <div key={req._id} className="card-dark p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-100 text-sm">{req.candidateId?.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{req.candidateId?.email}</p>
                <p className="text-xs text-slate-300 mt-2 italic">"{req.message}"</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleUpdate(req._id, 'accepted')}
                  className="btn-primary text-xs px-3 py-1.5"
                >
                  Accept &amp; Connect
                </button>
                <button
                  onClick={() => handleUpdate(req._id, 'rejected')}
                  className="btn-secondary text-xs px-3 py-1.5 text-rose-400"
                >
                  Decline
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReverseHiringRecruiter;
