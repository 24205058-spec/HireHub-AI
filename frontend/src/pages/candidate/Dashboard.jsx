import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { FiFileText, FiTarget, FiTrendingUp, FiCpu, FiBookmark, FiSend, FiCalendar, FiArrowRight } from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ applications: 0, saved: 0, interviews: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profRes, appRes, savedRes, intRes] = await Promise.all([
          api.get('/profile/candidate'),
          api.get('/applications/my'),
          api.get('/applications/saved'),
          api.get('/interviews/my'),
        ]);
        setProfile(profRes.data.data);
        setStats({
          applications: appRes.data.data?.length || 0,
          saved: savedRes.data.data?.length || 0,
          interviews: intRes.data.data?.length || 0,
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="p-12 text-center text-slate-500">Loading candidate dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-100">Welcome back, {user?.name}</h1>
        <p className="text-xs text-slate-400 mt-1">HireHub AI Career Command Center</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card-dark border-indigo-500/20">
          <span className="text-xs text-slate-400 font-medium">Profile Completeness</span>
          <p className="text-2xl font-black text-indigo-400 mt-1">{profile?.profileCompletion || 0}%</p>
        </div>
        <div className="card-dark border-emerald-500/20">
          <span className="text-xs text-slate-400 font-medium">Resume AI Score</span>
          <p className="text-2xl font-black text-emerald-400 mt-1">{profile?.resumeScore || 0}/100</p>
        </div>
        <div className="card-dark border-purple-500/20">
          <span className="text-xs text-slate-400 font-medium">Active Applications</span>
          <p className="text-2xl font-black text-purple-400 mt-1">{stats.applications}</p>
        </div>
        <div className="card-dark border-cyan-500/20">
          <span className="text-xs text-slate-400 font-medium">Upcoming Interviews</span>
          <p className="text-2xl font-black text-cyan-400 mt-1">{stats.interviews}</p>
        </div>
      </div>

      {/* Career Intelligence Quick Hub */}
      <div>
        <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">AI Career Intelligence Tools</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/candidate/resume" className="card-dark hover:border-indigo-500/50 transition-all p-5 space-y-2 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xl">
              <FiFileText />
            </div>
            <h3 className="font-bold text-slate-100 text-sm group-hover:text-indigo-400 transition-colors">AI Resume Analyzer</h3>
            <p className="text-xs text-slate-400">Heuristic keyword scanning, experience caliber scoring, and targeted fixes.</p>
          </Link>

          <Link to="/candidate/skill-gap" className="card-dark hover:border-indigo-500/50 transition-all p-5 space-y-2 group">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xl">
              <FiTarget />
            </div>
            <h3 className="font-bold text-slate-100 text-sm group-hover:text-cyan-400 transition-colors">Skill Gap Engine</h3>
            <p className="text-xs text-slate-400">Benchmark your current skill stack against standard target industry roles.</p>
          </Link>

          <Link to="/candidate/simulator" className="card-dark hover:border-indigo-500/50 transition-all p-5 space-y-2 group">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center text-xl">
              <FiCpu />
            </div>
            <h3 className="font-bold text-slate-100 text-sm group-hover:text-violet-400 transition-colors">What-If Career Simulator</h3>
            <p className="text-xs text-slate-400">Model how learning 2 new technologies instantly shifts your market value.</p>
          </Link>
        </div>
      </div>

      {/* Quick Links */}
      <div className="card-dark p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-100 text-sm">Looking to reverse the hiring dynamic?</h3>
          <p className="text-xs text-slate-400">Express direct interest to hiring managers at verified companies.</p>
        </div>
        <Link to="/candidate/reverse-hiring" className="btn-primary text-xs px-4 py-2">
          Explore Reverse Hiring <FiArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
