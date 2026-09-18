/**
 * HireHub AI - What-If Career Simulator
 */

const TARGET_ROLES = [
  { title: 'Frontend Developer', skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'TypeScript', 'Tailwind CSS'] },
  { title: 'Backend Developer', skills: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Docker', 'Python'] },
  { title: 'Full Stack Developer', skills: ['React', 'Node.js', 'MongoDB', 'Express.js', 'TypeScript', 'Docker', 'REST APIs'] },
  { title: 'DevOps Engineer', skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux', 'Terraform'] },
  { title: 'Data Scientist', skills: ['Python', 'Machine Learning', 'Pandas', 'SQL', 'TensorFlow', 'Statistics'] },
  { title: 'Cloud Solutions Architect', skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'System Design', 'Networking'] },
  { title: 'Mobile Developer', skills: ['React Native', 'JavaScript', 'TypeScript', 'iOS', 'Android', 'Firebase'] }
];

const computeCompatibility = (skills = [], roleSkills = []) => {
  if (!roleSkills.length) return 0;
  const normalizedCandidate = skills.map(s => s.toLowerCase().trim());
  const matched = roleSkills.filter(rs =>
    normalizedCandidate.some(cs => cs.includes(rs.toLowerCase().trim()) || rs.toLowerCase().trim().includes(cs))
  );
  return Math.round((matched.length / roleSkills.length) * 100);
};

exports.simulate = (currentSkills = [], skillsToAdd = ['Node.js', 'Docker']) => {
  const baselineScores = TARGET_ROLES.map(role => ({
    role: role.title,
    currentCompatibility: computeCompatibility(currentSkills, role.skills),
  }));

  const simulatedPool = [...currentSkills, ...skillsToAdd];

  const finalScores = TARGET_ROLES.map(role => {
    const initial = computeCompatibility(currentSkills, role.skills);
    const updated = computeCompatibility(simulatedPool, role.skills);
    return {
      role: role.title,
      currentCompatibility: initial,
      finalCompatibility: updated,
      improvement: Math.max(0, updated - initial),
    };
  });

  const topImprovements = [...finalScores]
    .filter(item => item.improvement > 0)
    .sort((a, b) => b.improvement - a.improvement);

  const top = topImprovements[0];
  const summary = top
    ? `Acquiring ${skillsToAdd.join(' & ')} yields a +${top.improvement}% gain in match compatibility for ${top.role} positions.`
    : 'Your simulated skill expansion provides enhanced breadth across related technology disciplines.';

  return {
    currentSkills,
    skillsToAdd,
    baselineScores,
    finalScores,
    topImprovements,
    summary,
    disclaimer: 'This simulation model is an algorithmic projection and not an offer or guarantee of employment.',
  };
};
