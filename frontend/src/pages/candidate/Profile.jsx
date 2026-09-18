import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { FiSave, FiUpload } from 'react-icons/fi';

const Profile = () => {
  const [formData, setFormData] = useState({
    headline: '',
    bio: '',
    phone: '',
    location: '',
    skills: '',
    currentRole: '',
    yearsOfExperience: 0,
    github: '',
    linkedin: '',
    portfolio: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile/candidate');
        const p = res.data.data;
        setFormData({
          headline: p.headline || '',
          bio: p.bio || '',
          phone: p.phone || '',
          location: p.location || '',
          skills: (p.skills || []).join(', '),
          currentRole: p.currentRole || '',
          yearsOfExperience: p.yearsOfExperience || 0,
          github: p.github || '',
          linkedin: p.linkedin || '',
          portfolio: p.portfolio || '',
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        yearsOfExperience: Number(formData.yearsOfExperience) || 0,
      };
      await api.put('/profile/candidate', payload);
      toast.success('Candidate profile updated!');
    } catch (err) {
      toast.error('Error saving profile');
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append('resume', file);
    try {
      await api.post('/profile/candidate/resume', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Resume uploaded successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading profile...</div>;

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-100">Candidate Profile</h1>
        <p className="text-xs text-slate-400 mt-0.5">Manage your digital recruitment identity and AI credentials</p>
      </div>

      <div className="card-dark p-6">
        <label className="block text-xs font-bold text-slate-300 mb-2">Upload Resume Document (PDF, DOCX)</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeUpload}
          className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
        />
      </div>

      <form onSubmit={handleSave} className="card-dark space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Professional Headline</label>
            <input type="text" name="headline" value={formData.headline} onChange={handleChange} placeholder="Full Stack Developer | React & Node" className="input-dark text-xs" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Current Job Title</label>
            <input type="text" name="currentRole" value={formData.currentRole} onChange={handleChange} placeholder="Software Engineer" className="input-dark text-xs" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">About / Bio</label>
          <textarea name="bio" rows={3} value={formData.bio} onChange={handleChange} placeholder="Passionate engineer building..." className="input-dark text-xs" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Core Skills (comma separated)</label>
          <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Node.js, MongoDB, Docker, TypeScript" className="input-dark text-xs" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Years of Experience</label>
            <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} className="input-dark text-xs" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="New York, NY" className="input-dark text-xs" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub URL</label>
            <input type="text" name="github" value={formData.github} onChange={handleChange} placeholder="https://github.com/username" className="input-dark text-xs" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn URL</label>
            <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/username" className="input-dark text-xs" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Portfolio Site</label>
            <input type="text" name="portfolio" value={formData.portfolio} onChange={handleChange} placeholder="https://portfolio.dev" className="input-dark text-xs" />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" disabled={saving} className="btn-primary text-xs px-6 py-2.5">
            <FiSave /> {saving ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
