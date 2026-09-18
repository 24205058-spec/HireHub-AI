/**
 * HireHub AI - Career Path Generator
 */

const PATH_CATALOG = {
  'frontend developer|full stack developer': [
    {
      role: 'Frontend Developer',
      requiredSkills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Git'],
      suggestedProjects: ['Interactive Design System', 'E-commerce Storefront'],
      technologies: ['React', 'Vite', 'Tailwind CSS'],
      estimatedDuration: 'Current Milestone',
    },
    {
      role: 'Frontend Specialist & State Architect',
      requiredSkills: ['React Performance', 'Redux Toolkit', 'TypeScript', 'Testing Library'],
      suggestedProjects: ['High-throughput Analytics Dashboard', 'Microfrontend Shell'],
      technologies: ['React 18', 'TypeScript', 'RTK Query', 'Vitest'],
      estimatedDuration: '3-6 months',
    },
    {
      role: 'Backend Engineering Associate',
      requiredSkills: ['Node.js', 'Express.js', 'MongoDB', 'Authentication & JWT', 'RESTful API Design'],
      suggestedProjects: ['Multi-tenant Auth & Organization Management API', 'Realtime Chat WebSockets'],
      technologies: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'Redis'],
      estimatedDuration: '4-7 months',
    },
    {
      role: 'Full Stack Developer',
      requiredSkills: ['System Design', 'Docker', 'CI/CD Pipelines', 'Cloud Deployment (AWS/GCP)'],
      suggestedProjects: ['Full-stack SaaS Recruitment Platform with reverse hiring and AI matching'],
      technologies: ['Docker', 'AWS ECS', 'GitHub Actions', 'MongoDB Atlas'],
      estimatedDuration: '4-6 months',
    },
  ],
  'default': [
    {
      role: 'Core Contributor',
      requiredSkills: ['Foundational Programming', 'Git Workflow', 'Core Frameworks'],
      suggestedProjects: ['Feature Development & Bug Triage', 'Component Documentation'],
      technologies: ['JavaScript', 'Node.js', 'Git'],
      estimatedDuration: 'Current',
    },
    {
      role: 'Mid-Level Specialist',
      requiredSkills: ['Advanced Frameworks', 'API Design', 'Database Modeling', 'Testing'],
      suggestedProjects: ['End-to-end Service Implementation', 'Performance Tuning'],
      technologies: ['React', 'Express', 'MongoDB', 'Jest'],
      estimatedDuration: '6-12 months',
    },
    {
      role: 'Senior Technical Lead',
      requiredSkills: ['Architecture Decisions', 'Distributed Systems', 'DevOps & Observability', 'Mentorship'],
      suggestedProjects: ['Fault-tolerant Microservices Platform', 'Security Audit Implementation'],
      technologies: ['Docker', 'Kubernetes', 'Cloud Infrastructure', 'Monitoring'],
      estimatedDuration: '12-24 months',
    },
  ]
};

exports.generateCareerPath = (currentRole = 'Frontend Developer', targetRole = 'Full Stack Developer') => {
  const normCurrent = currentRole.toLowerCase().trim();
  const normTarget = targetRole.toLowerCase().trim();
  const key = `${normCurrent}|${normTarget}`;

  const matchKey = Object.keys(PATH_CATALOG).find(k => {
    const [from, to] = k.split('|');
    return normCurrent.includes(from) && normTarget.includes(to);
  }) || 'default';

  const stages = PATH_CATALOG[matchKey];
  const allSkills = [...new Set(stages.flatMap(s => s.requiredSkills))];

  return {
    currentRole,
    targetRole,
    stages,
    totalEstimatedDuration: '12-18 months of structured progression',
    requiredSkills: allSkills,
    disclaimer: 'Estimates reflect average milestone durations for dedicated learners; individual schedules vary.',
  };
};
