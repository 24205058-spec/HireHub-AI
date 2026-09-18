/**
 * HireHub AI - Candidate Ranking Service
 */

const jobMatcher = require('./jobMatcher');

exports.rankCandidates = (candidates = [], job = {}) => {
  return candidates
    .map(cand => {
      const profile = cand.profile || cand;
      const user = cand.userId || cand;
      const match = jobMatcher.calculateMatch(profile, job);
      return {
        candidateId: user._id || profile.userId,
        name: user.name || 'Candidate',
        email: user.email || '',
        avatar: user.avatar || '',
        headline: profile.headline || profile.currentRole || 'Software Professional',
        location: profile.location || 'Not specified',
        skills: profile.skills || [],
        yearsOfExperience: profile.yearsOfExperience || 0,
        matchScore: match.overallScore,
        matchBreakdown: match,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
};
