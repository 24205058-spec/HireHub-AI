import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { FiCalendar, FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

const RecruiterInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00 AM');
  const [candidateEmail, setCandidateEmail] = useState('alex@candidate.com');

  const load = async () => {
    try {
      const res = await api.get('/interviews/my');
      setInterviews(res.data.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSchedule = async (e) => {
    e.preventDefault();
    try {
      const allUsers = await api.get('/admin/users');
      const target = (allUsers.data.data || []).find(u => u.email === candidateEmail);
      if (!target) {
        toast.error('Candidate not found with this email');
        return;
      }
      await api.post('/interviews', {
        candidateId: target._id,
        date: date || new Date().toISOString().split('T')[0],
        time,
        meetingLink: 'https://meet.google.com/hirehub-room',
        type: 'technical'
      });
      toast.success('Interview scheduled!');
      load();
    } catch (e) {
      toast.error('Error scheduling interview');
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-100">Recruiter Interview Hub</h1>
        <p className="text-xs text-slate-400 mt-0.5">Schedule and coordinate candidate video screenings</p>
      </div>

      <form onSubmit={handleSchedule} className="card-dark grid sm:grid-cols-4 gap-3">
        <input
          type="email"
          value={candidateEmail}
          onChange={e => setCandidateEmail(e.target.value)}
          placeholder="Candidate Email"
          className="input-dark text-xs"
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="input-dark text-xs"
        />
        <input
          type="text"
          value={time}
          onChange={e => setTime(e.target.value)}
          placeholder="10:00 AM"
          className="input-dark text-xs"
        />
        <button type="submit" className="btn-primary text-xs px-4 py-2.5">
          <FiPlus /> Schedule
        </button>
      </form>

      <div className="space-y-3">
        {interviews.map(item => (
          <div key={item._id} className="card-dark p-4 flex items-center justify-between text-xs">
            <div>
              <h4 className="font-bold text-slate-100 text-sm">{item.candidateId?.name}</h4>
              <p className="text-slate-400 mt-0.5">{item.date} at {item.time} &bull; {item.type}</p>
            </div>
            <a href={item.meetingLink} target="_blank" rel="noreferrer" className="btn-secondary text-xs px-3 py-1.5">
              Launch Room
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruiterInterviews;
