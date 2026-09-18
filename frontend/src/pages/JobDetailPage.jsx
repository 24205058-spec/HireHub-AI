import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { formatSalary } from '../utils/helpers';
import { FiMapPin, FiBriefcase, FiDollarSign, FiZap, FiCheck, FiSend, FiBookmark } from 'react-icons/fi';
import { toast } from 'react-toastify';

const JobDetailPage = () => {
  const { id } = useParams();
  const { isAuthenticated, isCandidate } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [matchData, setMatchData] = useState(null);
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data.data);
        if (isAuthenticated && isCandidate) {
          try {
            const matchRes = await api.post('/ai/job-match', { jobId: id });
            setMatchData(matchRes.data.data);
          } catch (e) {}
        }
      } catch (err) {
        toast.error('Failed to load job');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, isAuthenticated, isCandidate]);

  const handleApply = async () => {
    try {
      setApplying(true);
      await api.post('/applications', { jobId: id, coverLetter });
      toast.success('Application submitted successfully!');
      setApplied(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error submitting application');
    } finally {
      setApplying(false);
    }
  };

  const handleSave = async () => {
    try {
      const res = await api.post('/applications/save', { jobId: id });
      toast.success(res.data.message);
    } catch (err) {
      toast.error('Error updating saved jobs');
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  if (!job) return <div className="p-8 text-center text-slate-400">Job not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="card-dark space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wide">
              {job.companyId?.companyName || 'Enterprise Partner'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-100 mt-1">{job.title}</h1>
          </div>
          <div className="flex items-center gap-3">
            {isCandidate && (
              <>
                <button onClick={handleSave} className="btn-secondary text-xs px-3 py-2">
                  <FiBookmark /> Bookmark
                </button>
                <button
                  onClick={handleApply}
                  disabled={applying || applied}
                  className="btn-primary text-xs px-5 py-2"
                >
                  <FiSend /> {applied ? 'Applied' : applying ? 'Sending...' : 'Apply Now'}
                </button>
              </>
            )}
            {!isAuthenticated && (
              <Link to="/login" className="btn-primary text-xs px-4 py-2">
                Sign in to Apply
              </Link>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
          <span className="flex items-center gap-1"><FiMapPin /> {job.location || 'Remote'}</span>
          <span className="flex items-center gap-1"><FiBriefcase /> {job.workMode}</span>
          <span className="flex items-center gap-1"><FiDollarSign /> {formatSalary(job.salary)}</span>
          <span>Quality Index: <strong className="text-indigo-400">{job.qualityScore || 85}/100</strong></span>
        </div>
      </div>

      {/* AI Match Breakdown (Candidate view) */}
      {matchData && (
        <div className="card-dark border-indigo-500/30 bg-indigo-950/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiZap className="text-indigo-400 text-lg" />
              <h3 className="text-sm font-bold text-slate-100">HireHub AI Compatibility Engine</h3>
            </div>
            <span className="text-lg font-black text-indigo-300">{matchData.overallScore}% Overall Match</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-slate-400">Skill Score</span>
              <p className="text-base font-bold text-emerald-400 mt-1">{matchData.skillScore}%</p>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-slate-400">Experience</span>
              <p className="text-base font-bold text-indigo-400 mt-1">{matchData.experienceScore}%</p>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-slate-400">Education</span>
              <p className="text-base font-bold text-purple-400 mt-1">{matchData.educationScore}%</p>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-slate-400">Location</span>
              <p className="text-base font-bold text-cyan-400 mt-1">{matchData.locationScore}%</p>
            </div>
          </div>

          <div className="text-xs text-slate-300 space-y-1 bg-slate-900/50 p-3 rounded-xl">
            {matchData.explanation.map((exp, i) => (
              <p key={i} className="flex items-center gap-2">
                <FiCheck className="text-emerald-400 shrink-0" /> {exp}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Description & Requirements */}
      <div className="card-dark space-y-6">
        <div>
          <h3 className="text-sm font-bold text-slate-200 mb-2">Job Description</h3>
          <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
            {job.description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-200 mb-2">Target Technical Competencies</h3>
          <div className="flex flex-wrap gap-2">
            {(job.skills || []).map((s, i) => (
              <span key={i} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs font-medium text-slate-200">
                {s}
              </span>
            ))}
          </div>
        </div>

        {job.responsibilities?.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-slate-200 mb-2">Core Responsibilities</h3>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
              {job.responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetailPage;
