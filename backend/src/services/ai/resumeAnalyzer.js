/**
 * HireHub AI - Resume Analyzer Service
 * Comprehensive evaluation of candidate profile and resume parameters.
 */

const TECHNICAL_KEYWORDS = [
  'javascript', 'python', 'java', 'react', 'node', 'mongodb', 'sql', 'aws', 'docker',
  'kubernetes', 'typescript', 'angular', 'vue', 'express', 'django', 'flask', 'spring',
  'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'git', 'ci/cd', 'agile',
  'rest', 'graphql', 'html', 'css', 'tailwind', 'microservices'
];

const ACTION_VERBS = [
  'developed', 'built', 'designed', 'implemented', 'managed', 'led', 'created', 'improved',
  'optimized', 'reduced', 'increased', 'achieved', 'delivered', 'collaborated', 'architected'
];

exports.analyzeResume = (profile) => {
  const skills = profile.skills || [];
  const experience = profile.experience || [];
  const education = profile.education || [];
  const bio = (profile.bio || '').toLowerCase();
  const headline = (profile.headline || '').toLowerCase();
  const certifications = profile.certifications || [];
  const projects = profile.projects || [];

  // Skills Score
  const techSkillCount = skills.filter(s =>
    TECHNICAL_KEYWORDS.some(k => s.toLowerCase().includes(k))
  ).length;
  const skillScore = Math.min(98, Math.max(30, 45 + techSkillCount * 6 + Math.min(skills.length * 2, 20)));

  // Experience Score
  let expScore = 40;
  if (experience.length > 0) expScore += 25;
  if (experience.length >= 2) expScore += 15;
  const allExpText = experience.map(e => (e.description || '') + ' ' + (e.title || '')).join(' ').toLowerCase();
  const actionVerbCount = ACTION_VERBS.filter(v => allExpText.includes(v)).length;
  expScore += Math.min(actionVerbCount * 3, 15);
  expScore = Math.min(96, expScore);

  // Keywords Score
  const allText = `${bio} ${headline} ${allExpText} ${skills.join(' ')}`.toLowerCase();
  const keywordMatches = TECHNICAL_KEYWORDS.filter(k => allText.includes(k)).length;
  const keywordScore = Math.min(95, Math.max(35, 30 + keywordMatches * 4));

  // Profile Completeness
  let completeness = 0;
  if (headline) completeness += 15;
  if (bio && bio.length > 20) completeness += 15;
  if (skills.length >= 4) completeness += 20;
  if (experience.length > 0) completeness += 20;
  if (education.length > 0) completeness += 15;
  if (certifications.length > 0) completeness += 10;
  if (projects.length > 0) completeness += 5;

  const overallScore = Math.min(98, Math.round(
    skillScore * 0.35 +
    expScore * 0.25 +
    keywordScore * 0.20 +
    completeness * 0.20
  ));

  const recommendations = [];
  if (skills.length < 6) recommendations.push('Add more specific technical and domain skills to increase visibility.');
  if (projects.length === 0) recommendations.push('Include 2+ production or portfolio projects demonstrating end-to-end delivery.');
  if (certifications.length === 0) recommendations.push('Add industry-recognized certifications (e.g. AWS, Meta, Google, CKA).');
  if (!allExpText.includes('%') && !allExpText.includes('$') && !allExpText.includes('improved')) {
    recommendations.push('Add measurable outcomes in experience bullets (e.g. "reduced latency by 35%").');
  }
  if (!profile.github && !profile.linkedin) {
    recommendations.push('Attach verified GitHub and LinkedIn profile URLs for recruiter validation.');
  }

  return {
    overallScore,
    breakdown: {
      skills: skillScore,
      experience: expScore,
      keywords: keywordScore,
      profileCompleteness: completeness,
    },
    recommendations,
    disclaimer: 'Analysis produced by HireHub AI Career Intelligence engine.',
  };
};
