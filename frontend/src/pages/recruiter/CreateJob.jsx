import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { FiCheckCircle, FiAlertTriangle, FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

const CreateJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    minSalary: 90000,
    maxSalary: 140000,
    minExp: 2,
    maxExp: 5,
    location: 'San Francisco, CA',
    jobType: 'full-time',
    workMode: 'hybrid',
    responsibilities: '',
  });

  const [quality, setQuality] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const checkQuality = async () => {
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        salary: { min: Number(formData.minSalary), max: Number(formData.maxSalary) },
        responsibilities: formData.responsibilities.split('\n').filter(Boolean),
        workMode: formData.workMode,
      };
      const res = await api.post('/ai/job-quality', payload);
      setQuality(res.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const payload = {
        title: formData.title,
        description: formData.description,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        experience: { min: Number(formData.minExp), max: Number(formData.maxExp) },
        salary: { min: Number(formData.minSalary), max: Number(formData.maxSalary), currency: 'USD' },
        location: formData.location,
        jobType: formData.jobType,
        workMode: formData.workMode,
        responsibilities: formData.responsibilities.split('\n').filter(Boolean),
      };
      await api.post('/jobs', payload);
      toast.success('Job listing published successfully!');
      navigate('/recruiter/jobs');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create job');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-100">Create New Job Position</h1>
        <p className="text-xs text-slate-400 mt-0.5">Publish positions evaluated through the HireHub AI Quality Engine</p>
      </div>

      <form onSubmit={handleSubmit} className="card-dark space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Job Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            onBlur={checkQuality}
            placeholder="Senior Full Stack Engineer"
            className="input-dark text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Job Description</label>
          <textarea
            rows={4}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            onBlur={checkQuality}
            placeholder="Describe the opportunity, technical mission, and team culture in detail..."
            className="input-dark text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Core Required Skills (comma separated)</label>
          <input
            type="text"
            required
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            onBlur={checkQuality}
            placeholder="React, Node.js, MongoDB, TypeScript, Docker"
            className="input-dark text-xs"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Min Salary ($)</label>
            <input type="number" value={formData.minSalary} onChange={(e) => setFormData({ ...formData, minSalary: e.target.value })} onBlur={checkQuality} className="input-dark text-xs" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Max Salary ($)</label>
            <input type="number" value={formData.maxSalary} onChange={(e) => setFormData({ ...formData, maxSalary: e.target.value })} onBlur={checkQuality} className="input-dark text-xs" />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
            <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="input-dark text-xs" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Job Type</label>
            <select value={formData.jobType} onChange={(e) => setFormData({ ...formData, jobType: e.target.value })} className="input-dark text-xs">
              <option value="full-time">Full-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Work Mode</label>
            <select value={formData.workMode} onChange={(e) => setFormData({ ...formData, workMode: e.target.value })} onBlur={checkQuality} className="input-dark text-xs">
              <option value="hybrid">Hybrid</option>
              <option value="remote">Remote</option>
              <option value="on-site">On-site</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Key Responsibilities (One per line)</label>
          <textarea
            rows={3}
            value={formData.responsibilities}
            onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
            onBlur={checkQuality}
            placeholder="Architect and deploy scalable APIs&#10;Mentor junior engineering staff"
            className="input-dark text-xs"
          />
        </div>

        {/* Quality Analysis Real-time Preview */}
        {quality && (
          <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-500/30 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200">AI Job Quality Score</span>
              <span className="font-black text-indigo-400 text-base">{quality.score}/100 &bull; {quality.grade}</span>
            </div>
            {quality.suggestions.length > 0 && (
              <div className="text-slate-300 space-y-1">
                {quality.suggestions.map((sug, i) => (
                  <p key={i} className="flex items-center gap-1.5 text-[11px] text-amber-300">
                    <FiAlertTriangle className="shrink-0" /> {sug}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="pt-4 flex justify-end">
          <button type="submit" disabled={submitting} className="btn-primary text-xs px-6 py-2.5">
            <FiPlus /> {submitting ? 'Publishing...' : 'Publish Job Listing'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;
