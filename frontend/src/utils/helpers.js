export const formatSalary = (salary) => {
  if (!salary) return 'Salary undisclosed';
  if (salary.min && salary.max) {
    return `$${(salary.min / 1000).toFixed(0)}k - $${(salary.max / 1000).toFixed(0)}k`;
  }
  if (salary.min) return `From $${(salary.min / 1000).toFixed(0)}k`;
  if (salary.max) return `Up to $${(salary.max / 1000).toFixed(0)}k`;
  return 'Competitive';
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const getStatusBadgeColor = (status) => {
  const map = {
    applied: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
    'under-review': 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    shortlisted: 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
    interview: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30',
    selected: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    rejected: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
    pending: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    accepted: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  };
  return map[status] || 'bg-slate-500/15 text-slate-400 border border-slate-500/30';
};
