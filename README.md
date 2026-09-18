# HireHub AI

> **"Where Talent Finds Opportunity — and Opportunity Finds Talent."**

HireHub AI is an intelligent, dual-mode full-stack recruitment platform engineered on the MERN stack (MongoDB, Express.js, React, Node.js) with Docker containerization and deterministic AI career intelligence engines.

Unlike conventional job portals (such as LinkedIn Jobs or Indeed), HireHub AI supports **both** standard candidate-driven job applications and an innovative **Reverse Hiring** workflow where candidates express direct interest to hiring enterprises.

---

## 🌟 Core Highlights & Architectural Pillars

### 1. Dual-Mode Recruitment Engine
- **Traditional Hiring Workflow:**
  Candidate &rarr; Search &amp; Filter Jobs &rarr; Inspect AI Match Score &rarr; Apply &rarr; Recruiter Pipeline Review &rarr; Interview Scheduling &rarr; Selection
- **Reverse Hiring Workflow:**
  Candidate &rarr; Browse Verified Organizations &rarr; Express Direct Interest &rarr; Recruiter Receives Talent Inquiry &rarr; Accept/Decline &rarr; Interview Scheduling

### 2. Built-in AI Career Intelligence Suite
- **AI Resume Analyzer:** Scans technical keyword density, action verbs, measurable impact bullets, and completeness to score candidate resumes out of 100 with actionable feedback.
- **AI Job Matcher:** Computes multi-factor compatibility scores (Skills: 45%, Experience: 25%, Education: 15%, Location: 15%) between candidate profiles and job requirements with granular explanations.
- **AI Skill Gap Analyzer:** Benchmarks a candidate's existing skillset against target industry roles to pinpoint missing competencies and recommend ordered learning roadmaps.
- **AI Career Path Generator:** Generates multi-stage career progression paths with required milestones, technologies, and suggested portfolio projects.
- **What-If Career Simulator:** Enables candidates to simulate acquiring new skills (e.g., Node.js + Docker) and projects the instant percentage gain across compatible roles.
- **AI Job Quality Analyzer:** Evaluates recruiter job descriptions in real-time for missing salary ranges, vague descriptions, and skill deficiencies.
- **AI Candidate Ranking:** Ranks applicant pools algorithmically based on job requirement alignment.

---

## 🏗️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, JavaScript (ES6+), React Router DOM v6, Redux Toolkit, Context API, Tailwind CSS, Framer Motion, React Icons, Axios, React-Toastify |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose ODM, JWT (JSON Web Tokens), bcryptjs, Multer, Helmet, CORS, express-rate-limit, express-validator, EJS (Server-Side Rendering) |
| **DevOps & Containers** | Docker, Docker Compose, Multi-stage Dockerfiles, Nginx (Frontend Production Image), Alpine Node.js |

---

## 📁 Project Directory Structure

```
HireHub-AI/
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── JobCard.jsx
│   │   │   └── NotificationBell.jsx
│   │   ├── pages/
│   │   │   ├── candidate/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Profile.jsx
│   │   │   │   ├── ResumeAnalyzer.jsx
│   │   │   │   ├── SkillGap.jsx
│   │   │   │   ├── CareerPath.jsx
│   │   │   │   ├── CareerSimulator.jsx
│   │   │   │   ├── Applications.jsx
│   │   │   │   ├── SavedJobs.jsx
│   │   │   │   ├── ReverseHiring.jsx
│   │   │   │   └── Interviews.jsx
│   │   │   ├── recruiter/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Profile.jsx
│   │   │   │   ├── Jobs.jsx
│   │   │   │   ├── CreateJob.jsx
│   │   │   │   ├── Applicants.jsx
│   │   │   │   ├── Candidates.jsx
│   │   │   │   ├── ReverseHiring.jsx
│   │   │   │   ├── Interviews.jsx
│   │   │   │   └── Analytics.jsx
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   └── Reports.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── JobsPage.jsx
│   │   │   ├── JobDetailPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx
│   │   │   └── DashboardLayout.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useJobs.js
│   │   │   ├── useApplications.js
│   │   │   └── useNotifications.js
│   │   ├── redux/
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── jobSlice.js
│   │   │   │   ├── applicationSlice.js
│   │   │   │   └── notificationSlice.js
│   │   │   └── store.js
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── routes/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── RoleRoute.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── Dockerfile
│   └── .env.example
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── jwt.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── jobController.js
│   │   │   ├── applicationController.js
│   │   │   ├── reverseHiringController.js
│   │   │   ├── interviewController.js
│   │   │   ├── notificationController.js
│   │   │   ├── profileController.js
│   │   │   └── adminController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── error.js
│   │   │   ├── upload.js
│   │   │   └── validate.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── CandidateProfile.js
│   │   │   ├── RecruiterProfile.js
│   │   │   ├── Job.js
│   │   │   ├── Application.js
│   │   │   ├── SavedJob.js
│   │   │   ├── ReverseHiringRequest.js
│   │   │   ├── Interview.js
│   │   │   ├── Notification.js
│   │   │   ├── Message.js
│   │   │   ├── SkillGap.js
│   │   │   ├── CareerPath.js
│   │   │   ├── AIMatchResult.js
│   │   │   ├── JobReport.js
│   │   │   └── AuditLog.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── jobs.js
│   │   │   ├── applications.js
│   │   │   ├── reverseHiring.js
│   │   │   ├── interviews.js
│   │   │   ├── notifications.js
│   │   │   ├── profile.js
│   │   │   ├── admin.js
│   │   │   └── ai.js
│   │   ├── services/
│   │   │   └── ai/
│   │   │       ├── jobMatcher.js
│   │   │       ├── resumeAnalyzer.js
│   │   │       ├── skillGapAnalyzer.js
│   │   │       ├── careerPath.js
│   │   │       ├── careerSimulator.js
│   │   │       ├── jobQualityAnalyzer.js
│   │   │       └── candidateRanking.js
│   │   ├── utils/
│   │   │   ├── asyncHandler.js
│   │   │   └── helpers.js
│   │   ├── views/
│   │   │   └── report.ejs
│   │   ├── app.js
│   │   └── server.js
│   ├── uploads/
│   │   └── .gitkeep
│   ├── test/
│   │   └── api.test.js
│   ├── seed.js
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
│
├── docker-compose.yml
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🔑 Demo Login Credentials (Development & Testing Only)

| User Role | Email Address | Password | Permissions & Features |
|---|---|---|---|
| **Administrator** | `admin@hirehub.ai` | `Admin@123` | Platform dashboard, user toggle, SSR executive reports |
| **Recruiter** | `sarah@techcorp.com` | `Recruiter@123` | Job posting with AI quality score, applicant pipeline, reverse requests |
| **Recruiter** | `james@innovateai.com` | `Recruiter@123` | AI research studio, candidate matching, interview scheduling |
| **Candidate** | `alex@candidate.com` | `Candidate@123` | Full-stack profile, AI resume scoring, skill gap, reverse hiring |
| **Candidate** | `priya@candidate.com` | `Candidate@123` | Frontend engineer profile, career path simulator |

---

## 🚀 Installation & Local Run Guide

### Option 1: Running with Docker Compose (Recommended)
```bash
# From project root:
docker compose up --build
```
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api`
- Admin SSR Report: `http://localhost:5000/api/admin/reports`

---

### Option 2: Running Locally Without Docker

#### Prerequisites
- Node.js v18+
- MongoDB local instance running at `mongodb://localhost:27017`

#### 1. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
npm run seed     # Seeds 1 admin, 3 recruiters, 5 candidates, 10 jobs, applications & interviews
npm start        # Starts Express server on http://localhost:5000
```

#### 2. Setup Frontend
```bash
cd ../frontend
npm install
cp .env.example .env
npm run dev      # Launches Vite dev server on http://localhost:5173
```

---

## 🧪 Verification & Testing

Execute the automated AI algorithmic verification suite:
```bash
cd backend
npm test
```

Verified test cases include:
1. `jobMatcher`: Multi-weighted candidate match scoring (>70%)
2. `resumeAnalyzer`: Completeness, keyword, and action verb indexing
3. `skillGapAnalyzer`: Dynamic comparison and missing skill extraction
4. `careerSimulator`: Forecasting compatibility gains on acquiring new skills
5. `jobQualityAnalyzer`: Evaluating recruiter job clarity and salary transparency

---

## 📚 Academic Course Syllabus Mapping

### Module 1: Web Architecture & Advanced JavaScript
- **MVC Architecture:** Clean separation of concerns across Models (`backend/src/models`), Views (`backend/src/views/report.ejs`), and Controllers (`backend/src/controllers`).
- **JavaScript Objects & Arrays:** Modeled extensively throughout profiles, skill sets, and pipelines.
- **Instance Methods & Functional Array Operations:** Usage of `.map()`, `.filter()`, `.reduce()`, `.some()`, `.includes()` in AI services.
- **Asynchronous JS, Promises & Async/Await:** Consistent `async/await` error-handled API pipelines across Express and Axios.
- **ES Modules:** Modern `import`/`export` across frontend Vite bundle and CommonJS modularity in Node.js backend.

### Module 2: Frontend Engineering with React & Redux
- **React Components & Props:** 15+ modular components (`JobCard`, `Navbar`, `Sidebar`, `NotificationBell`, etc.) using explicit prop interfaces.
- **React Hooks:** Standardized usage of `useState`, `useEffect`, `useContext`, `useReducer`, and custom hooks (`useAuth`, `useJobs`, `useApplications`, `useNotifications`).
- **Global State Management:** Redux Toolkit store with 4 specialized slices (`authSlice`, `jobSlice`, `applicationSlice`, `notificationSlice`).
- **Context API:** `ThemeContext` providing dynamic theme switching.
- **Routing & Guards:** React Router v6 with `ProtectedRoute` and role-based `RoleRoute` guards.

### Module 3: Server Engineering with Node.js & Express
- **RESTful API Design:** CRUD operations with consistent JSON response wrappers and HTTP status codes.
- **Custom Middleware:** Authentication verification (`protect`), role-based authorization (`authorize`), error formatting (`errorHandler`), file validation (`upload`), and rate limiting.
- **Server-Side Rendering (SSR):** EJS template engine dynamically rendering live administrative metrics at `/api/admin/reports`.
- **Async File I/O & Multer:** Resume document uploads saved to disk storage.

### Module 4: Database Modeling & DevOps
- **MongoDB & Mongoose:** 15+ relational-style Mongoose schemas with compound indexes, pre-save hashing hooks, and model population.
- **Docker Containerization:** Isolated container environments for MongoDB (`mongo:7.0`), Node.js backend, and multi-stage Nginx-served React frontend.
- **Data Persistence:** Named Docker volume (`mongodb_data`) for database persistence across reboots.

### Module 5: Full-Stack Integration & Production Standards
- **Security Best Practices:** Password encryption via bcryptjs (12 salt rounds), stateless JWT auth, Helmet headers, CORS policies, rate limiting, and zero hardcoded secrets.
- **Real-World Problem Solving:** Eliminating hiring bottlenecks through dual-mode traditional and reverse hiring.
- **Comprehensive Documentation:** Production-ready README, seed scripts, and API contract specifications.

---

## 📄 License
Released under the [MIT License](LICENSE).
