import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiSearch, FiRepeat, FiCpu, FiTrendingUp } from 'react-icons/fi';

const LandingPage = () => {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-3xl"></div>
          <div className="w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-3xl -translate-y-20"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
            Where Talent Finds Opportunity &mdash; and Opportunity Finds Talent
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-100">
            Your Skills. Your Opportunity.{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent">
              Your Future.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed">
            AI-powered recruitment that helps candidates discover opportunities and helps recruiters discover hidden talent through intelligent dual-mode hiring.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/jobs" className="btn-primary text-sm px-6 py-3">
              <FiSearch /> Find Jobs
            </Link>
            <Link to="/register?role=candidate" className="btn-secondary text-sm px-6 py-3">
              Get Hired
            </Link>
            <Link to="/register?role=recruiter" className="btn-secondary text-sm px-6 py-3 border-indigo-500/30 text-indigo-300">
              Hire Talent
            </Link>
          </div>
        </div>
      </section>

      {/* Dual Hiring Pillars */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            A New Paradigm in Tech Recruitment
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Eliminating traditional hiring friction through synchronized bilateral workflows.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card-dark border-indigo-500/20 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-xl mb-4">
              <FiSearch />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">Traditional Hiring &bull; Forward Flow</h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Explore verified positions, leverage real-time AI skill match percentages, submit tracked applications, and progress through structured interview stages.
            </p>
            <div className="space-y-2 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2"><FiCheckCircle className="text-emerald-400" /> Granular skill compatibility scoring</div>
              <div className="flex items-center gap-2"><FiCheckCircle className="text-emerald-400" /> Transparent pipeline tracking</div>
            </div>
          </div>

          <div className="card-dark border-cyan-500/20 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center text-xl mb-4">
              <FiRepeat />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">Reverse Hiring &bull; Direct Outreach</h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Candidates express direct interest in pioneering organizations. Recruiters receive rich talent inquiries and initiate direct conversations without job friction.
            </p>
            <div className="space-y-2 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2"><FiCheckCircle className="text-cyan-400" /> Candidate initiates connection</div>
              <div className="flex items-center gap-2"><FiCheckCircle className="text-cyan-400" /> Bypass traditional resume black holes</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Intelligence Showcase */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="card-dark bg-gradient-to-br from-slate-900 to-indigo-950/40 border-indigo-500/30 p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-2xl">
                <FiCpu />
              </div>
              <h4 className="font-bold text-slate-100 text-sm">Resume &amp; Skill Diagnostics</h4>
              <p className="text-xs text-slate-400">Heuristic keyword indexing, experience calibration, and tailored recommendations.</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center text-2xl">
                <FiTrendingUp />
              </div>
              <h4 className="font-bold text-slate-100 text-sm">What-If Career Simulator</h4>
              <p className="text-xs text-slate-400">Simulate skill upgrades to forecast market compatibility before committing time.</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-2xl">
                <FiCheckCircle />
              </div>
              <h4 className="font-bold text-slate-100 text-sm">AI Job Quality Engine</h4>
              <p className="text-xs text-slate-400">Scrutinizes job listings to guarantee transparent salaries, skills, and expectations.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
