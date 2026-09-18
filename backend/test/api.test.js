/**
 * Basic integration validation test for HireHub AI Backend logic.
 */
const assert = require('assert');
const jobMatcher = require('../src/services/ai/jobMatcher');
const resumeAnalyzer = require('../src/services/ai/resumeAnalyzer');
const skillGap = require('../src/services/ai/skillGapAnalyzer');
const careerSimulator = require('../src/services/ai/careerSimulator');
const jobQuality = require('../src/services/ai/jobQualityAnalyzer');

console.log('Running HireHub AI Service Tests...');

// 1. Job Matcher test
const mockCandidate = {
  skills: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
  yearsOfExperience: 3,
  education: [{ degree: 'Bachelor of Science' }],
  location: 'San Francisco, CA'
};
const mockJob = {
  title: 'Full Stack Engineer',
  skills: ['React', 'Node.js', 'MongoDB', 'Docker'],
  experience: { min: 2, max: 5 },
  location: 'San Francisco, CA',
  workMode: 'hybrid'
};
const match = jobMatcher.calculateMatch(mockCandidate, mockJob);
assert(match.overallScore > 70, 'Match score should exceed 70%');
console.log('✔ Job Matcher Service: passed (Score:', match.overallScore, '%)');

// 2. Resume Analyzer test
const resumeResult = resumeAnalyzer.analyzeResume(mockCandidate);
assert(resumeResult.overallScore > 50, 'Resume score should be computed');
console.log('✔ Resume Analyzer Service: passed (Score:', resumeResult.overallScore, '%)');

// 3. Skill Gap test
const gapResult = skillGap.analyzeSkillGap(['React', 'JavaScript'], 'Full Stack Developer');
assert(gapResult.missing.length > 0, 'Missing skills should be detected');
console.log('✔ Skill Gap Analyzer: passed (Missing skills identified:', gapResult.missing.length, ')');

// 4. Career Simulator test
const simResult = careerSimulator.simulate(['React', 'JavaScript'], ['Node.js', 'Docker']);
assert(simResult.finalScores.length > 0, 'Simulator should compute upgraded scores');
console.log('✔ Career Simulator Service: passed');

// 5. Job Quality Analyzer test
const qualityResult = jobQuality.analyzeJobQuality({
  title: 'Full Stack Engineer',
  description: 'A comprehensive job description for hiring a top full stack engineer to build great products.',
  skills: ['React', 'Node.js', 'MongoDB'],
  salary: { min: 80000, max: 120000 },
  responsibilities: ['Build UI', 'Deploy APIs'],
  workMode: 'remote'
});
assert(qualityResult.score > 50, 'Job quality score computed');
console.log('✔ Job Quality Analyzer: passed (Score:', qualityResult.score, ')');

console.log('\nAll HireHub AI algorithmic verification checks PASSED successfully!');
