/**
 * HireHub AI - Skill Gap Analyzer Service
 */

const ROLE_SKILL_MATRIX = {
  'full stack developer': ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express.js', 'REST APIs', 'Docker', 'Git', 'TypeScript', 'Tailwind CSS'],
  'frontend developer': ['JavaScript', 'React', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux', 'Git', 'Next.js', 'Testing'],
  'backend developer': ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'REST APIs', 'Docker', 'Microservices', 'Redis', 'Python', 'AWS'],
  'data scientist': ['Python', 'Machine Learning', 'TensorFlow', 'Pandas', 'NumPy', 'SQL', 'Scikit-learn', 'Statistics', 'Data Visualization', 'Docker'],
  'devops engineer': ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux', 'Terraform', 'Jenkins', 'Git', 'Bash', 'Prometheus'],
  'cloud architect': ['AWS', 'Azure', 'Terraform', 'Docker', 'Kubernetes', 'Microservices', 'System Design', 'Networking', 'Security', 'Python'],
  'mobile developer': ['React Native', 'Flutter', 'JavaScript', 'TypeScript', 'iOS', 'Android', 'Firebase', 'REST APIs', 'Redux', 'Git'],
  'machine learning engineer': ['Python', 'TensorFlow', 'PyTorch', 'MLOps', 'Docker', 'Deep Learning', 'NLP', 'Computer Vision', 'SQL', 'Git']
};

const LEARNING_RESOURCES = {
  'Docker': ['Docker Docs & Architecture Tutorials', 'KodeKloud Hands-on Labs', 'Docker Deep Dive'],
  'Kubernetes': ['Kubernetes The Hard Way', 'CKA Prep Track', 'Official K8s Interactive Labs'],
  'AWS': ['AWS Certified Cloud Practitioner & SAA', 'AWS Skill Builder Labs', 'Stephane Maarek SAA'],
  'React': ['Official React 18 Docs', 'Full Stack Open Part 1-5', 'Epic React by Kent'],
  'Node.js': ['Node.js Design Patterns', 'The Odin Project NodeJS Path', 'Official Node Guides'],
  'TypeScript': ['TypeScript Handbook', 'Total TypeScript by Matt Pocock', 'TS with React Guide'],
  'MongoDB': ['MongoDB University (M001/M121)', 'Mongoose ODM Architecture Guide', 'Aggregation Pipeline Tutorial'],
  'Microservices': ['Microservices Pattern by Chris Richardson', 'Domain-Driven Design Fundamentals', 'Event-Driven Architecture with RabbitMQ'],
  'Python': ['Real Python Learning Paths', 'Automate the Boring Stuff with Python', 'Fluent Python'],
  'Machine Learning': ['fast.ai Practical Deep Learning', 'Coursera DeepLearning.AI Specialization', 'Scikit-learn User Guide'],
};

exports.analyzeSkillGap = (candidateSkills = [], targetJob = 'Full Stack Developer') => {
  const targetKey = targetJob.toLowerCase().trim();
  const keys = Object.keys(ROLE_SKILL_MATRIX);
  const matchedKey = keys.find(k => targetKey.includes(k) || k.includes(targetKey)) || 'full stack developer';
  const requiredSkills = ROLE_SKILL_MATRIX[matchedKey];

  const normalizedCandidate = candidateSkills.map(s => s.toLowerCase().trim());

  const alreadyHave = requiredSkills.filter(skill =>
    normalizedCandidate.some(cs => cs.includes(skill.toLowerCase()) || skill.toLowerCase().includes(cs))
  );

  const missing = requiredSkills.filter(skill =>
    !normalizedCandidate.some(cs => cs.includes(skill.toLowerCase()) || skill.toLowerCase().includes(cs))
  );

  const learningPath = missing.map((skill, index) => ({
    step: index + 1,
    skill,
    resources: LEARNING_RESOURCES[skill] || [`Comprehensive Guide to ${skill}`, `${skill} Documentation & Practice Projects`, 'FreeCodeCamp Interactive Course'],
    estimatedDuration: index < 2 ? '2-3 weeks' : index < 4 ? '3-5 weeks' : '4-8 weeks',
    priority: index < 2 ? 'High' : index < 4 ? 'Medium' : 'Elective',
  }));

  const matchPercentage = Math.round((alreadyHave.length / requiredSkills.length) * 100);

  return {
    targetJob: matchedKey.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    alreadyHave,
    missing,
    learningPath,
    matchPercentage,
    totalRequired: requiredSkills.length,
    disclaimer: 'Skill gaps are computed via role competence benchmarks to assist personal development.',
  };
};
