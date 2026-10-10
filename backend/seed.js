require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const CandidateProfile = require('./src/models/CandidateProfile');
const RecruiterProfile = require('./src/models/RecruiterProfile');
const Job = require('./src/models/Job');
const Application = require('./src/models/Application');
const Notification = require('./src/models/Notification');
const ReverseHiringRequest = require('./src/models/ReverseHiringRequest');
const Interview = require('./src/models/Interview');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hirehub_ai');
  console.log('MongoDB connected for seeding...');
};

const seed = async () => {
  try {
    await connectDB();
    await Promise.all([
      User.deleteMany({}),
      CandidateProfile.deleteMany({}),
      RecruiterProfile.deleteMany({}),
      Job.deleteMany({}),
      Application.deleteMany({}),
      Notification.deleteMany({}),
      ReverseHiringRequest.deleteMany({}),
      Interview.deleteMany({}),
    ]);
    console.log('Cleared existing data.');

    // 1 Admin
    const admin = await User.create({
      name: 'Platform Administrator',
      email: 'admin@hirehub.ai',
      password: 'Admin@123',
      role: 'admin',
    });

    // 3 Recruiters
    const recruitersData = [
      { name: 'Sarah Mitchell', email: 'sarah@techcorp.com', companyName: 'TechCorp Solutions', industry: 'Enterprise Cloud & SaaS', location: 'San Francisco, CA', description: 'TechCorp builds scalable enterprise software powering modern business infrastructure globally.', website: 'https://techcorp.example.com', size: '500-1000 employees' },
      { name: 'James Rodriguez', email: 'james@innovateai.com', companyName: 'InnovateAI Labs', industry: 'Artificial Intelligence & ML', location: 'New York, NY', description: 'Frontier AI research studio developing applied intelligent agents and NLP systems.', website: 'https://innovateai.example.com', size: '50-200 employees' },
      { name: 'Emily Chen', email: 'emily@cloudnext.io', companyName: 'CloudNext Systems', industry: 'DevOps & Cloud Infrastructure', location: 'Austin, TX', description: 'Cloud infrastructure consulting and high-reliability platform engineering specialists.', website: 'https://cloudnext.example.com', size: '200-500 employees' },
    ];

    const recruiters = [];
    const recruiterProfiles = [];

    for (const r of recruitersData) {
      const user = await User.create({ name: r.name, email: r.email, password: 'Recruiter@123', role: 'recruiter' });
      const profile = await RecruiterProfile.create({
        userId: user._id,
        companyName: r.companyName,
        companyDescription: r.description,
        website: r.website,
        location: r.location,
        industry: r.industry,
        companySize: r.size,
        techStack: ['React', 'Node.js', 'AWS', 'MongoDB', 'Docker', 'Kubernetes'],
        isVerified: true,
      });
      recruiters.push(user);
      recruiterProfiles.push(profile);
    }

    // 6 Candidates
    const candidatesData = [
      { name: 'Lathishri', email: 'lathishri@hirehub.ai', headline: 'AI & Full Stack Engineer | React, Node.js, Python', bio: 'Motivated engineer specializing in AI intelligence, web architecture, and full-stack software development.', location: 'Chennai, India', skills: ['React', 'Node.js', 'MongoDB', 'Python', 'JavaScript', 'TypeScript', 'Docker', 'REST APIs', 'Git'], exp: 3, role: 'Full Stack Developer' },
      { name: 'Alex Johnson', email: 'alex@candidate.com', headline: 'Full Stack Engineer | React, Node.js, MongoDB', bio: 'Full-stack builder with 3+ years delivering scalable SaaS apps and modern UI architectures.', location: 'New York, NY', skills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'TypeScript', 'Docker', 'Git', 'REST APIs', 'Express.js'], exp: 3, role: 'Full Stack Developer' },
      { name: 'Priya Patel', email: 'priya@candidate.com', headline: 'Frontend Engineer & UI Architect', bio: 'Passionate about design systems, accessible web interfaces, and high-performance React applications.', location: 'Remote', skills: ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3', 'Redux', 'Git'], exp: 2, role: 'Frontend Developer' },
      { name: 'Marcus Williams', email: 'marcus@candidate.com', headline: 'Data Scientist & Machine Learning Specialist', bio: 'Applied ML engineer with expertise in predictive modeling, NLP pipelines, and data analytics.', location: 'Austin, TX', skills: ['Python', 'Machine Learning', 'TensorFlow', 'Pandas', 'NumPy', 'SQL', 'Scikit-learn', 'Docker'], exp: 4, role: 'Data Scientist' },
      { name: 'Sofia Hernandez', email: 'sofia@candidate.com', headline: 'DevOps & Site Reliability Engineer', bio: 'Cloud engineer focused on containerization, CI/CD pipelines, and high availability systems.', location: 'San Francisco, CA', skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux', 'Jenkins', 'Python'], exp: 5, role: 'DevOps Engineer' },
      { name: 'Kevin Lee', email: 'kevin@candidate.com', headline: 'Senior Backend Developer & API Architect', bio: 'Backend specialist architecting high-throughput REST and microservice backends.', location: 'Seattle, WA', skills: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Redis', 'REST APIs', 'Docker', 'Microservices'], exp: 4, role: 'Backend Developer' },
    ];

    const candidates = [];
    const candidateProfiles = [];

    for (const c of candidatesData) {
      const user = await User.create({ name: c.name, email: c.email, password: 'Candidate@123', role: 'candidate' });
      const profile = await CandidateProfile.create({
        userId: user._id,
        headline: c.headline,
        bio: c.bio,
        location: c.location,
        skills: c.skills,
        yearsOfExperience: c.exp,
        currentRole: c.role,
        profileCompletion: 85,
        education: [{ degree: 'B.S. in Computer Science', institution: 'University of Technology', field: 'Computer Science', startYear: 2017, endYear: 2021 }],
        experience: [{ title: c.role, company: 'Apex Digital', startDate: '2021-06', endDate: 'Present', current: true, description: `Engineered robust core features using ${c.skills.slice(0, 3).join(', ')}.` }],
        certifications: [{ name: 'Certified Cloud Practitioner', issuer: 'Amazon Web Services', date: '2023' }],
      });
      candidates.push(user);
      candidateProfiles.push(profile);
    }

    // 10 Jobs
    const jobsList = [
      { title: 'Senior Full Stack Developer', recruiterIdx: 0, location: 'San Francisco, CA', workMode: 'hybrid', jobType: 'full-time', skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Docker'], exp: { min: 3, max: 6 }, salary: { min: 110000, max: 145000 }, description: 'Build enterprise-tier applications with modern MERN stack architecture.', openings: 2 },
      { title: 'Machine Learning Engineer', recruiterIdx: 1, location: 'New York, NY', workMode: 'remote', jobType: 'full-time', skills: ['Python', 'TensorFlow', 'PyTorch', 'Docker', 'MLOps'], exp: { min: 2, max: 5 }, salary: { min: 125000, max: 165000 }, description: 'Deploy and optimize machine learning models within our flagship AI analytics pipeline.', openings: 1 },
      { title: 'DevOps & Cloud Infrastructure Lead', recruiterIdx: 2, location: 'Austin, TX', workMode: 'on-site', jobType: 'full-time', skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'], exp: { min: 3, max: 7 }, salary: { min: 115000, max: 155000 }, description: 'Orchestrate multi-region cloud clusters with Infrastructure-as-Code and CI/CD automation.', openings: 2 },
      { title: 'Frontend UI/UX Engineer', recruiterIdx: 0, location: 'San Francisco, CA', workMode: 'hybrid', jobType: 'full-time', skills: ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML5'], exp: { min: 1, max: 4 }, salary: { min: 85000, max: 115000 }, description: 'Design and implement fluid, accessible, and responsive user interfaces for global users.', openings: 3 },
      { title: 'Data Scientist & AI Analyst', recruiterIdx: 1, location: 'New York, NY', workMode: 'hybrid', jobType: 'full-time', skills: ['Python', 'Machine Learning', 'Pandas', 'SQL', 'Statistics'], exp: { min: 2, max: 5 }, salary: { min: 95000, max: 135000 }, description: 'Transform raw multi-source business data into actionable predictive intelligence.', openings: 2 },
      { title: 'Backend Node.js Architect', recruiterIdx: 2, location: 'Remote', workMode: 'remote', jobType: 'full-time', skills: ['Node.js', 'Express.js', 'MongoDB', 'Redis', 'REST APIs'], exp: { min: 3, max: 6 }, salary: { min: 105000, max: 140000 }, description: 'Scale low-latency microservices handling millions of authenticated API interactions daily.', openings: 2 },
      { title: 'Cloud Solutions Architect', recruiterIdx: 2, location: 'Austin, TX', workMode: 'hybrid', jobType: 'full-time', skills: ['AWS', 'Terraform', 'Kubernetes', 'Docker', 'System Design'], exp: { min: 5, max: 10 }, salary: { min: 150000, max: 195000 }, description: 'Lead architectural roadmaps and high-reliability cloud topologies for key enterprise clients.', openings: 1 },
      { title: 'Mobile React Native Developer', recruiterIdx: 0, location: 'San Francisco, CA', workMode: 'remote', jobType: 'full-time', skills: ['React Native', 'JavaScript', 'TypeScript', 'iOS', 'Android'], exp: { min: 2, max: 5 }, salary: { min: 90000, max: 125000 }, description: 'Craft world-class mobile user journeys deployed to both Google Play and Apple App Store.', openings: 2 },
      { title: 'Product Manager - Recruitment AI', recruiterIdx: 1, location: 'New York, NY', workMode: 'hybrid', jobType: 'full-time', skills: ['Product Management', 'Agile', 'Jira', 'Data Analysis', 'SQL'], exp: { min: 3, max: 7 }, salary: { min: 120000, max: 160000 }, description: 'Own the feature lifecycle of our next-generation automated talent assessment features.', openings: 1 },
      { title: 'Junior Web Developer (Internship)', recruiterIdx: 0, location: 'Remote', workMode: 'remote', jobType: 'internship', skills: ['JavaScript', 'React', 'HTML5', 'CSS3', 'Git'], exp: { min: 0, max: 1 }, salary: { min: 35000, max: 50000 }, description: 'Kickstart your tech career writing production frontend components alongside mentors.', openings: 4 }
    ];

    const jobs = [];
    for (const j of jobsList) {
      const job = await Job.create({
        ...j,
        recruiterId: recruiters[j.recruiterIdx]._id,
        companyId: recruiterProfiles[j.recruiterIdx]._id,
        responsibilities: [
          'Design and implement modular production solutions',
          'Collaborate across product, design, and engineering teams',
          'Participate in code reviews, continuous testing, and sprints'
        ],
        requirements: [
          'Demonstrated expertise in relevant technology stack',
          'Solid communication skills and proactive problem solving',
          'Bachelor degree or equivalent practical industry experience'
        ],
        qualityScore: 88,
        status: 'active',
        deadline: new Date(Date.now() + 30 * 24 * 3600 * 1000),
      });
      jobs.push(job);
    }

    // Applications
    const appMatrix = [
      { c: 0, j: 0, s: 'shortlisted', m: 92 },
      { c: 0, j: 3, s: 'under-review', m: 84 },
      { c: 1, j: 3, s: 'interview', m: 95 },
      { c: 2, j: 1, s: 'applied', m: 89 },
      { c: 3, j: 2, s: 'selected', m: 96 },
      { c: 4, j: 5, s: 'shortlisted', m: 91 },
      { c: 1, j: 0, s: 'applied', m: 76 },
      { c: 2, j: 4, s: 'under-review', m: 88 }
    ];

    for (const item of appMatrix) {
      await Application.create({
        candidateId: candidates[item.c]._id,
        jobId: jobs[item.j]._id,
        recruiterId: jobs[item.j].recruiterId,
        status: item.s,
        matchScore: item.m,
        coverLetter: 'Excited about the role and confident my skill profile will add immediate value.',
        statusHistory: [{ status: 'applied', changedAt: new Date(Date.now() - 5 * 86400000) }]
      });
      await Job.findByIdAndUpdate(jobs[item.j]._id, { $inc: { applicationCount: 1 } });
    }

    // Reverse Hiring
    await ReverseHiringRequest.create({
      candidateId: candidates[0]._id,
      recruiterId: recruiters[1]._id,
      companyId: recruiterProfiles[1]._id,
      message: 'Hello! I am deeply intrigued by InnovateAI Labs. I would love to explore engineering roles with your ML team.',
      skills: ['React', 'Node.js', 'MongoDB', 'Docker'],
      status: 'pending',
    });

    await ReverseHiringRequest.create({
      candidateId: candidates[3]._id,
      recruiterId: recruiters[2]._id,
      companyId: recruiterProfiles[2]._id,
      message: 'CloudNext infrastructure work aligns directly with my AWS and Kubernetes expertise.',
      skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
      status: 'accepted',
      recruiterNote: 'Impressive credentials. We have arranged an initial screening interview.',
    });

    // Interview
    await Interview.create({
      candidateId: candidates[1]._id,
      recruiterId: recruiters[0]._id,
      jobId: jobs[3]._id,
      date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
      time: '11:00 AM EST',
      meetingLink: 'https://meet.google.com/hirehub-ai-alex',
      notes: 'Frontend architecture deep-dive & React component design review.',
      type: 'technical',
      status: 'scheduled'
    });

    // Notifications
    await Notification.create({
      userId: candidates[0]._id,
      title: 'Application Shortlisted! 🎉',
      message: 'Your candidacy for Senior Full Stack Developer was upgraded to Shortlisted.',
      type: 'status-change',
      read: false,
    });

    console.log('✅ Demo seed data created successfully!');
    console.log('================================================================');
    console.log('HIREHUB AI - DEMO TEST CREDENTIALS (DEVELOPMENT ONLY)');
    console.log('Role       | Email                | Password');
    console.log('----------------------------------------------------------------');
    console.log('Admin      | admin@hirehub.ai     | Admin@123');
    console.log('Recruiter  | sarah@techcorp.com   | Recruiter@123');
    console.log('Recruiter  | james@innovateai.com | Recruiter@123');
    console.log('Candidate  | alex@candidate.com   | Candidate@123');
    console.log('Candidate  | priya@candidate.com  | Candidate@123');
    console.log('================================================================');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seed();
