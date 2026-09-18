/**
 * HireHub AI - Job Quality Analyzer
 */

exports.analyzeJobQuality = (job = {}) => {
  let score = 100;
  const issues = [];
  const suggestions = [];

  if (!job.title || job.title.trim().length < 5) {
    score -= 15;
    issues.push('Job title lacks specificity or is too brief.');
    suggestions.push('Use standard standardized titles such as "Senior Full Stack Engineer (Node/React)".');
  }

  if (!job.description || job.description.trim().length < 120) {
    score -= 25;
    issues.push('Job description is sparse (under 120 characters).');
    suggestions.push('Elaborate on mission, day-to-day impact, and team expectations (250+ words recommended).');
  }

  if (!job.skills || job.skills.length < 3) {
    score -= 20;
    issues.push('Insufficient skill tags designated for accurate algorithmic indexing.');
    suggestions.push('Specify at least 4 to 8 core and secondary technical skills.');
  }

  if (!job.salary || (!job.salary.min && !job.salary.max)) {
    score -= 15;
    issues.push('No compensation disclosure provided.');
    suggestions.push('List a transparent salary range to maximize qualified applicant engagement by up to 40%.');
  }

  if (!job.responsibilities || job.responsibilities.length < 2) {
    score -= 10;
    issues.push('Bullet points for responsibilities are missing or scarce.');
    suggestions.push('List 3-5 explicit responsibilities.');
  }

  if (!job.workMode) {
    score -= 5;
    issues.push('Work mode not set (remote, on-site, hybrid).');
    suggestions.push('Clarify remote vs on-site policy.');
  }

  const finalScore = Math.max(10, Math.min(100, score));

  return {
    score: finalScore,
    grade: finalScore >= 85 ? 'Grade A (Excellent)' : finalScore >= 70 ? 'Grade B (Good)' : finalScore >= 50 ? 'Grade C (Fair)' : 'Grade D (Needs Attention)',
    missingInformation: issues,
    suggestions,
    disclaimer: 'Evaluation performed by HireHub AI Job Quality Indexing system.',
  };
};
