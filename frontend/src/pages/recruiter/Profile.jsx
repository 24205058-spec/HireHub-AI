import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';

const RecruiterProfile = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyDescription: '',
    website: '',
    location: '',
    industry: '',
    companySize: '',
  });

  useEffect(() => {
    const fetchP = async () => {
      try {
        const res = await api.get('/profile/recruiter');
        const p = res.data.data;
        setFormData({
          companyName: p.companyName || '',
          companyDescription: p.companyDescription || '',
          website: p.website || '',
          location: p.location || '',
          industry: p.industry || '',
          companySize: p.companySize || '',
        });
      } catch (e) {}
    };
    fetchP();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.put('/profile/recruiter', formData);
      toast.success('Company details saved');
    } catch (e) {
      toast.error('Error saving profile');
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-100">Enterprise Profile</h1>
        <p className="text-xs text-slate-400 mt-0.5">Public corporate presence seen by job seekers and reverse hiring candidates</p>
      </div>

      <form onSubmit={handleSave} className="card-dark space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Company Legal Name</label>
          <input type="text" value={formData.companyName} onChange={e => setFormData({ ...formData, companyName: e.target.value })} className="input-dark text-xs" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Corporate Mission &amp; Overview</label>
          <textarea rows={3} value={formData.companyDescription} onChange={e => setFormData({ ...formData, companyDescription: e.target.value })} className="input-dark text-xs" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Headquarters Location</label>
            <input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="input-dark text-xs" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Industry</label>
            <input type="text" value={formData.industry} onChange={e => setFormData({ ...formData, industry: e.target.value })} className="input-dark text-xs" />
          </div>
        </div>
        <div className="pt-2 flex justify-end">
          <button type="submit" className="btn-primary text-xs px-5 py-2.5">
            <FiSave /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecruiterProfile;
