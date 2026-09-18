import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiGrid, FiUser, FiFileText, FiTarget, FiTrendingUp, FiCpu,
  FiSend, FiBookmark, FiRepeat, FiCalendar, FiPlusCircle,
  FiUsers, FiBarChart2, FiShield, FiFile
} from 'react-icons/fi';

const Sidebar = ({ role }) => {
  const candidateLinks = [
    { to: '/candidate/dashboard', icon: <FiGrid />, label: 'Dashboard' },
    { to: '/candidate/profile', icon: <FiUser />, label: 'Profile' },
    { to: '/candidate/resume', icon: <FiFileText />, label: 'AI Resume Analyzer' },
    { to: '/candidate/skill-gap', icon: <FiTarget />, label: 'Skill Gap Engine' },
    { to: '/candidate/career-path', icon: <FiTrendingUp />, label: 'Career Pathway' },
    { to: '/candidate/simulator', icon: <FiCpu />, label: 'What-If Simulator' },
    { to: '/candidate/applications', icon: <FiSend />, label: 'My Applications' },
    { to: '/candidate/saved-jobs', icon: <FiBookmark />, label: 'Saved Jobs' },
    { to: '/candidate/reverse-hiring', icon: <FiRepeat />, label: 'Reverse Hiring' },
    { to: '/candidate/interviews', icon: <FiCalendar />, label: 'Interviews' },
  ];

  const recruiterLinks = [
    { to: '/recruiter/dashboard', icon: <FiGrid />, label: 'Dashboard' },
    { to: '/recruiter/profile', icon: <FiUser />, label: 'Company Profile' },
    { to: '/recruiter/jobs/create', icon: <FiPlusCircle />, label: 'Post Job (AI Quality)' },
    { to: '/recruiter/jobs', icon: <FiFileText />, label: 'Active Jobs' },
    { to: '/recruiter/applicants', icon: <FiUsers />, label: 'Applicant Pipeline' },
    { to: '/recruiter/candidates', icon: <FiTarget />, label: 'AI Candidate Search' },
    { to: '/recruiter/reverse-hiring', icon: <FiRepeat />, label: 'Reverse Inquiries' },
    { to: '/recruiter/interviews', icon: <FiCalendar />, label: 'Interviews' },
    { to: '/recruiter/analytics', icon: <FiBarChart2 />, label: 'Recruitment Analytics' },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', icon: <FiGrid />, label: 'Admin Metrics' },
    { to: '/admin/reports', icon: <FiFile />, label: 'Server SSR Reports' },
  ];

  const links = role === 'candidate' ? candidateLinks : role === 'recruiter' ? recruiterLinks : adminLinks;

  return (
    <aside className="w-64 bg-slate-900/90 border-r border-slate-800 flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      <div className="p-4 flex-1 space-y-1">
        <p className="px-3 text-[11px] font-bold tracking-wider uppercase text-slate-500 mb-2">
          {role} navigation
        </p>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
