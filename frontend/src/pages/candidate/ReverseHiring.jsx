import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { FiSend, FiZap } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { getStatusBadgeColor } from '../../utils/helpers';

const ReverseHiring = () => {
  const [companies, setCompanies] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const loadData = async () => {
    try {
      const [compRes, reqRes] = await Promise.all([
        api.get('/reverse-hiring/companies'),
        api.get('/reverse-hiring/my-requests'),
      ]);
      setCompanies(compRes.data.data);
      setMyRequests(reqRes.data.data);
      if (compRes.data.data.length > 0) {
        setSelectedCompany(compRes.data.data[0]._id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!selectedCompany || !message.trim()) return;
    const targetComp = companies.find(c => c._id === selectedCompany);
    if (!targetComp) return;

    try {
      setSending(true);
      await api.post('/reverse-hiring', {
        companyId: targetComp._id,
        recruiterId: targetComp.userId?._id || targetComp.userId,
        message,
      });
      toast.success('Reverse hiring request dispatched!');
      setMessage('');
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error expressing interest');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-100">Reverse Hiring Hub</h1>
        <p className="text-xs text-slate-400 mt-0.5">Bypass traditional applications &mdash; express direct interest to companies</p>
      </div>

      <form onSubmit={handleSend} className="card-dark space-y-4">
        <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
          <FiZap className="text-amber-400" /> Express Direct Interest to an Enterprise
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Select Target Enterprise</label>
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="input-dark text-xs"
          >
            {companies.map((c) => (
              <option key={c._id} value={c._id}>
                {c.companyName} ({c.industry || 'Technology'}) &bull; {c.location || 'Remote'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Personalized Message</label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Introduce yourself and explain why your engineering experience aligns with this team..."
            className="input-dark text-xs"
          />
        </div>

        <button type="submit" disabled={sending} className="btn-primary text-xs px-5 py-2.5">
          <FiSend /> {sending ? 'Transmitting...' : 'Dispatch Request'}
        </button>
      </form>

      <div className="space-y-4">
        <h3 className="font-bold text-sm text-slate-100">My Reverse Hiring Transmissions</h3>
        {myRequests.length === 0 ? (
          <p className="text-xs text-slate-500">No requests sent yet.</p>
        ) : (
          <div className="space-y-3">
            {myRequests.map((req) => (
              <div key={req._id} className="card-dark p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-100">{req.companyId?.companyName || 'Enterprise'}</h4>
                  <p className="text-xs text-slate-300 mt-1 italic">"{req.message}"</p>
                  {req.recruiterNote && (
                    <p className="text-xs text-indigo-400 mt-1">Recruiter note: {req.recruiterNote}</p>
                  )}
                </div>
                <span className={`badge capitalize shrink-0 ${getStatusBadgeColor(req.status)}`}>
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReverseHiring;
