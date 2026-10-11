# HireHub AI — Comprehensive Project Documentation & Technical Report

**Project Title:** HireHub AI — Dual-Mode Intelligent Recruitment Platform  
**Tagline:** *“Where Talent Finds Opportunity — and Opportunity Finds Talent.”*  
**Architecture:** Full-Stack MERN (MongoDB, Express.js, React 18, Node.js) with Docker  
**Target Domain:** AI-Powered Recruitment, Career Intelligence & Talent Acquisition  
**Date:** October 2026  

---

## 📑 Table of Contents
1. [Executive Summary & Abstract](#1-executive-summary--abstract)
2. [Problem Statement & Core Innovations](#2-problem-statement--core-innovations)
3. [System Architecture & High-Level Design](#3-system-architecture--high-level-design)
4. [Role-Based Access Control (RBAC) & User Workflows](#4-role-based-access-control-rbac--user-workflows)
5. [Database Architecture & Schema Data Dictionary](#5-database-architecture--schema-data-dictionary)
6. [AI Career Intelligence Engines (Algorithmic Logic)](#6-ai-career-intelligence-engines-algorithmic-logic)
7. [RESTful API Specifications & Endpoints](#7-restful-api-specifications--endpoints)
8. [Frontend Engineering & State Management](#8-frontend-engineering--state-management)
9. [DevOps, Docker Containerization & Security](#9-devops-docker-containerization--security)
10. [Academic Course Syllabus Mapping (Modules 1–5)](#10-academic-course-syllabus-mapping-modules-15)
11. [Setup, Deployment & Testing Guide](#11-setup-deployment--testing-guide)

---

## 1. Executive Summary & Abstract

Traditional talent acquisition platforms (e.g., LinkedIn Jobs, Indeed) operate primarily as **one-directional listing directories** where recruiters broadcast job openings, and candidates passively submit resumes. This paradigm creates critical bottlenecks:
* Candidates suffer from the **"resume black hole"** with negligible feedback or visibility into why they were rejected.
* Job requirements often lack standardized quality, omitting transparent compensation and clear responsibilities.
* Candidates lack contextual tools to understand what skills they need to acquire to qualify for target roles.

**HireHub AI** re-engineers modern recruitment by introducing a **dual-channel recruitment engine**:
1. **Traditional Forward Hiring:** Candidate discovers jobs with real-time multi-dimensional AI match percentages (Skills 45%, Experience 25%, Education 15%, Location 15%), tracks application pipelines, and participates in scheduled interviews.
2. **Reverse Hiring:** Candidates directly initiate connections with verified enterprises and technical teams, allowing talent to pitch their capabilities directly to hiring managers.
3. **AI Career Intelligence Suite:** Integrates automated Resume Caliber Scoring (starting at 0% until uploaded and evaluated), Skill Gap Analysis with personalized learning paths, a What-If Career Simulator, Career Path Progression visualizers, and recruiter-side Job Quality and Candidate Ranking analyzers.

---

## 2. Problem Statement & Core Innovations

### 2.1 The Problem
* **Asymmetrical Information:** Job seekers have zero insight into how well their skills match job criteria before applying.
* **Passive Candidate Neglect:** Companies miss top niche talent because high-performing candidates rarely browse standard job boards.
* **Lack of Career Guidance:** Portals tell applicants they aren't qualified without showing *how* to bridge the gap.

### 2.2 HireHub AI Innovations
* **Dual-Channel Symmetry:** Supports both Job &rarr; Applicant and Candidate &rarr; Company workflows.
* **Deterministic Explainable AI:** No black-box claims; every score provides itemized matching factors and actionable feedback.
* **Cold-Start Integrity:** Profile Completeness and Resume Scores initialize strictly at **0%**, updating dynamically based on genuine user inputs and document analysis.
* **Integrated Executive Server-Side Rendering (SSR):** Incorporates Express + EJS templates to deliver real-time server-rendered platform audit reports alongside client-rendered React single-page applications.

---

## 3. System Architecture & High-Level Design

HireHub AI employs a modern decoupled **Model-View-Controller (MVC) + Service Layer Architecture**:

```
+-------------------------------------------------------------------------+
|                              CLIENT TIER                                |
|  React 18 SPA (Vite) + Tailwind CSS + Redux Toolkit + Context API       |
|  - Candidate Portal   - Recruiter Portal   - Admin Portal               |
+-------------------------------------------------------------------------+
                                    |
                                    | HTTPS / JSON (Axios API Client)
                                    v
+-------------------------------------------------------------------------+
|                            APPLICATION TIER                             |
|  Node.js + Express.js API Gateway (Port 5000)                           |
|  - Security Middleware: Helmet, CORS, express-rate-limit                |
|  - Auth Middleware: JWT (Bearer), Role Verification (RBAC)              |
|  - Multer Storage: Resume Document Processing (.pdf, .doc, .docx)       |
|  - EJS Template Engine: Server-Side Rendered Executive Reports          |
|                                                                         |
|  Controllers: Auth, Jobs, Applications, ReverseHiring, Interviews       |
|  AI Service Layer: 7 Heuristic & Algorithmic Intelligence Engines       |
+-------------------------------------------------------------------------+
                                    |
                                    | Mongoose ODM (BSON Protocol)
                                    v
+-------------------------------------------------------------------------+
|                               DATA TIER                                 |
|  MongoDB (Port 27017)                                                   |
|  - 15+ Schemas with Compound Indexing and Schema-level Validations      |
|  - Docker Named Volume (mongodb_data) for Persistent Storage            |
+-------------------------------------------------------------------------+
```

---

## 4. Role-Based Access Control (RBAC) & User Workflows

HireHub AI enforces strict, role-gated user journeys:

```
                                 [ USER REGISTRATION / LOGIN ]
                                               |
                  +----------------------------+----------------------------+
                  |                                                         |
                  v                                                         v
          [ ROLE: CANDIDATE ]                                       [ ROLE: RECRUITER ]
                  |                                                         |
   +--------------+--------------+                           +--------------+--------------+
   |                             |                           |                             |
   v                             v                           v                             v
[ Traditional Flow ]      [ Reverse Hiring ]         [ Job Management ]            [ Talent Discovery ]
- Search & Filter Jobs    - Browse Companies         - Create Job with AI Quality  - AI Candidate Search
- Inspect AI Match (45%)  - Direct Pitch Message       Score Check (0-100)         - Rank Applicants
- One-Click Apply         - Recruiter Review         - Review Applications         - Accept Reverse Requests
- Track Pipeline          - Direct Interview         - Schedule Interviews         - Recruiter Analytics
- AI Resume Diagnostics     Conversion               - Update Pipeline Status
- Skill Gap & Simulator
```

### 4.1 Administrator Capabilities
* System-wide platform governance.
* Real-time metrics dashboard (Users, Candidates, Recruiters, Listings, Applications, Interviews).
* User account status toggling (Active / Suspended).
* Access to native Server-Side Rendered (SSR) executive audit reports at `/api/admin/reports`.

---

## 5. Database Architecture & Schema Data Dictionary

HireHub AI incorporates 15+ normalized Mongoose models:

### 5.1 `User` Model
| Field | Type | Modifiers | Description |
|---|---|---|---|
| `name` | String | required, trim | User full display name |
| `email` | String | required, unique, lowercase | Authentication email |
| `password` | String | required, minlength: 6, select: false | bcryptjs hashed password (12 rounds) |
| `role` | String | enum: ['candidate', 'recruiter', 'admin'] | Platform access role |
| `avatar` | String | default: '' | Profile picture URL |
| `isActive` | Boolean | default: true | Account moderation status |

### 5.2 `CandidateProfile` Model
| Field | Type | Description |
|---|---|---|
| `userId` | ObjectId (Ref: User) | Associated candidate user |
| `headline` | String | Professional title (e.g., Full Stack Engineer) |
| `bio` | String | Personal career summary |
| `skills` | [String] | Array of technical and domain skills |
| `yearsOfExperience`| Number | Total years in industry |
| `resumeUrl` | String | Relative path to uploaded resume document |
| `resumeScore` | Number (default: 0) | AI-evaluated resume quality score |
| `profileCompletion`| Number (default: 0) | Dynamic completeness percentage |
| `education` | [Sub-Schema] | Degree, institution, field, graduation years |
| `experience` | [Sub-Schema] | Company, title, duration, metric descriptions |

### 5.3 `Job` Model
| Field | Type | Description |
|---|---|---|
| `recruiterId` | ObjectId (Ref: User) | Hiring manager owner |
| `companyId` | ObjectId (Ref: RecruiterProfile) | Associated company profile |
| `title` | String | Position title (indexed) |
| `description` | String | Detailed role expectations (indexed) |
| `skills` | [String] | Required technical skills (indexed) |
| `experience` | { min: Number, max: Number } | Years of experience boundaries |
| `salary` | { min: Number, max: Number, currency } | Compensation boundaries |
| `workMode` | String (enum: ['remote', 'on-site', 'hybrid']) | Location flexibility |
| `qualityScore`| Number | AI Job Quality score (0–100) |
| `status` | String (enum: ['active', 'closed', 'draft']) | Lifecycle status |

### 5.4 `ReverseHiringRequest` Model
| Field | Type | Description |
|---|---|---|
| `candidateId` | ObjectId (Ref: User) | Pitching candidate |
| `recruiterId` | ObjectId (Ref: User) | Target recruiter |
| `companyId` | ObjectId (Ref: RecruiterProfile) | Target enterprise |
| `message` | String | Candidate personalized pitch |
| `skills` | [String] | Highlighted competencies |
| `status` | String (enum: ['pending', 'accepted', 'rejected']) | Recruiter decision |

### 5.5 `Application` Model
| Field | Type | Description |
|---|---|---|
| `candidateId` | ObjectId (Ref: User) | Submitting candidate |
| `jobId` | ObjectId (Ref: Job) | Applied position |
| `recruiterId` | ObjectId (Ref: User) | Reviewing recruiter |
| `status` | String (enum: ['applied', 'under-review', 'shortlisted', 'interview', 'selected', 'rejected']) | Stage |
| `matchScore` | Number | AI match score at time of submission |
| `statusHistory`| [{ status, changedAt, note }] | Auditable pipeline timeline |

---

## 6. AI Career Intelligence Engines (Algorithmic Logic)

HireHub AI features a dedicated modular AI layer (`backend/src/services/ai/`) built using transparent, deterministic algorithms ready for future LLM integration.

### 6.1 `jobMatcher.js` — Multi-Factor Matching Algorithm
Calculates job suitability using a weighted scoring formula:

$$\text{Overall Score} = (0.45 \times \text{Skill}) + (0.25 \times \text{Exp}) + (0.15 \times \text{Edu}) + (0.15 \times \text{Loc})$$

* **Skill Score (45%):** Bidirectional substring intersection matching between candidate skills and job requirements.
* **Experience Score (25%):** Penalizes deficits relative to minimum requirements; prevents severe penalties for overqualified candidates.
* **Education Score (15%):** Calibrated by degree level (Masters/PhD = 98%, Bachelors = 85%, Diploma/Associate = 70%).
* **Location Score (15%):** Remote jobs automatically yield 100%; geographical proximity evaluated for on-site roles.

### 6.2 `resumeAnalyzer.js` — Resume Quality Engine
* Evaluates action verb frequency (`developed`, `architected`, `reduced`, `delivered`).
* Scans for quantifiable metrics (percentages, dollar amounts, multipliers).
* Evaluates technical keyword density against a 25+ industry standard vocabulary.
* **Integrity Guard:** Initializes strictly at **0/100**; requires document upload and profile inputs before evaluation.

### 6.3 `skillGapAnalyzer.js` — Gap & Learning Path Engine
* Cross-references candidate skills against a normalized role matrix (`Full Stack`, `Frontend`, `DevOps`, `Data Scientist`, `Cloud Architect`).
* Separates skills into **Already Mastered** vs. **Missing Competencies**.
* Produces an ordered, prioritized curriculum (Step, Estimated Duration, Resources, Priority).

### 6.4 `careerSimulator.js` — What-If Career Simulator
* Takes a hypothetical set of skills (e.g., `["Node.js", "Docker"]`).
* Re-evaluates compatibility vectors across all industry roles.
* Demonstrates projected percentage increases (e.g., +28% compatibility for Full Stack Developer).

### 6.5 `jobQualityAnalyzer.js` — Recruiter Quality Auditor
* Audits job postings for salary transparency, description word count, clear responsibilities, and skill tags.
* Returns a score out of 100 with actionable feedback to ensure recruiter listings attract top talent.

---

## 7. RESTful API Specifications & Endpoints

| Category | Method | Endpoint | Access | Purpose |
|---|---|---|---|---|
| **Auth** | POST | `/api/auth/register` | Public | Register candidate or recruiter |
| **Auth** | POST | `/api/auth/login` | Public | Authenticate user & return JWT |
| **Auth** | GET | `/api/auth/me` | Protected | Fetch current session & profile |
| **Jobs** | GET | `/api/jobs` | Public | Search & filter active listings |
| **Jobs** | GET | `/api/jobs/:id` | Public | Retrieve detailed job listing |
| **Jobs** | POST | `/api/jobs` | Recruiter | Post new job with AI quality score |
| **Jobs** | GET | `/api/jobs/my-jobs` | Recruiter | Retrieve recruiter's own postings |
| **Jobs** | GET | `/api/jobs/:id/applicants`| Recruiter | Retrieve applicants for a job |
| **Applications** | POST | `/api/applications` | Candidate | Submit job application |
| **Applications** | GET | `/api/applications/my` | Candidate | Retrieve application history |
| **Applications** | PUT | `/api/applications/:id/status`| Recruiter | Update applicant stage |
| **Reverse Hiring** | GET | `/api/reverse-hiring/companies` | Public | Browse verified enterprise profiles |
| **Reverse Hiring** | POST | `/api/reverse-hiring` | Candidate | Send direct candidate pitch |
| **Reverse Hiring** | GET | `/api/reverse-hiring/my-requests` | Candidate | Candidate's outbound pitches |
| **Reverse Hiring** | GET | `/api/reverse-hiring/recruiter-requests` | Recruiter | Inbound candidate inquiries |
| **Reverse Hiring** | PUT | `/api/reverse-hiring/:id` | Recruiter | Accept or decline inquiry |
| **AI Services** | POST | `/api/ai/resume-analyze` | Candidate | Evaluate resume & calculate score |
| **AI Services** | POST | `/api/ai/job-match` | Candidate | Calculate match against a job |
| **AI Services** | POST | `/api/ai/skill-gap` | Candidate | Run role skill gap analysis |
| **AI Services** | POST | `/api/ai/career-path` | Candidate | Generate career roadmap |
| **AI Services** | POST | `/api/ai/simulator` | Candidate | What-If career simulator |
| **AI Services** | POST | `/api/ai/job-quality` | Recruiter | Audit job quality score |
| **Admin SSR** | GET | `/api/admin/reports` | Public/Admin | Server-Side Rendered (EJS) report |

---

## 8. Frontend Engineering & State Management

* **Framework:** React 18 built with **Vite** for sub-second Hot Module Replacement (HMR).
* **Styling:** **Tailwind CSS** with a custom dark-mode design system and glassmorphism cards.
* **Global State (Redux Toolkit):**
  * `authSlice`: JWT authentication, current user identity, and session checks.
  * `jobSlice`: Filtered listings, search parameters, pagination metadata.
  * `applicationSlice`: Candidate submissions, saved jobs, pipeline status.
  * `notificationSlice`: Real-time alerts and unread counters.
* **Context API (`ThemeContext`):** Lightweight provider for theme persistence.
* **Custom Hooks:** Clean separation of concerns (`useAuth`, `useJobs`, `useApplications`, `useNotifications`).
* **Route Guards:** `ProtectedRoute` (requires valid JWT session) and `RoleRoute` (restricts routes to specific roles).

---

## 9. DevOps, Docker Containerization & Security

### 9.1 Multi-Container Docker Architecture (`docker-compose.yml`)
* **`mongodb`:** Base `mongo:7.0` image with persistent named volume `mongodb_data:/data/db`.
* **`backend`:** Multi-stage Alpine Node.js 20 container exposing port `5000`.
* **`frontend`:** Multi-stage build container using Alpine Nginx to serve production React bundles on port `80` (mapped to `5173`).
* **Shared Network:** Isolated `hirehub-network` bridge.

### 9.2 Security Implementation
* **Password Encryption:** bcryptjs with 12 computational salt rounds.
* **Stateless Tokens:** Signed JWT tokens with configurable expiration (`7d`).
* **HTTP Security Headers:** Integrated `helmet` protecting against XSS, clickjacking, and MIME sniffing.
* **Brute-Force Mitigation:** `express-rate-limit` restricting endpoints to 200 requests per 15-minute window.
* **CORS Flexibility:** Dynamic origin resolution preventing cross-port blocking.

---

## 10. Academic Course Syllabus Mapping (Modules 1–5)

| Syllabus Module | Theoretical Concept | Concrete Implementation in HireHub AI |
|---|---|---|
| **Module 1: Web Architecture & Advanced JS** | MVC Pattern, Asynchronous JS, ES Modules, Array Manipulation | Full MVC separation; async/await pipelines in Express & Axios; functional array operators (`.map()`, `.filter()`, `.reduce()`) driving the AI service layer. |
| **Module 2: Frontend Engineering with React & Redux** | React Hooks, Redux Toolkit, Context API, Protected Routing | Redux store with 4 slices; custom hooks (`useAuth`, `useJobs`); `ThemeContext`; `ProtectedRoute` and `RoleRoute` navigation guards. |
| **Module 3: Server Engineering with Node.js & Express** | RESTful APIs, Custom Middleware, Server-Side Rendering (SSR) | Express routing; custom auth, role, and error middleware; Multer file handling; EJS server-side template engine for `/api/admin/reports`. |
| **Module 4: Database Design & DevOps** | Schemas, Indexing, Mongoose ODM, Docker Containerization | 15+ Mongoose models with compound indexes; multi-container `docker-compose.yml` with persistent data volumes. |
| **Module 5: Full-Stack Integration & AI Engineering** | Production Architecture, Dual-Workflow Innovation, Automated Verification | Dual-mode traditional & reverse hiring; 7 deterministic AI engines; unit testing suite (`test/api.test.js`); seed script with sample data. |

---

## 11. Setup, Deployment & Testing Guide

### 11.1 Quick Start with Docker
```bash
# Clone and enter directory
cd HireHub-AI

# Build and start all 3 containers (MongoDB, Backend, Frontend)
docker compose up --build
```
* Frontend: `http://localhost:5173`
* Backend API: `http://localhost:5000/api`
* Admin SSR Report: `http://localhost:5000/api/admin/reports`

### 11.2 Local Setup (Without Docker)

#### Backend Setup
```bash
cd backend
npm install
Copy-Item .env.example .env     # Windows PowerShell
npm run seed                    # Seeds demo users, jobs, applications
npm start                       # Starts Express server on http://localhost:5000
```

#### Frontend Setup
```bash
cd ../frontend
npm install
Copy-Item .env.example .env     # Windows PowerShell
npm run dev                     # Starts Vite dev server on http://localhost:5173
```

### 11.3 Automated Verification Suite
Run the backend AI verification tests:
```bash
cd backend
npm test
```
**Test Results:**
* ✔ `Job Matcher Service`: **87%** computed match score.
* ✔ `Resume Analyzer Service`: Scored and verified breakdown factors.
* ✔ `Skill Gap Analyzer`: Correctly extracted 8 missing technical skills.
* ✔ `Career Simulator Service`: Projected instant compatibility gains on skill additions.
* ✔ `Job Quality Analyzer`: Quality grade **75/100** with actionable suggestions.

---

### 11.4 Demo Credentials

| Role | Email | Password | Notable Features |
|---|---|---|---|
| **Candidate (AI / Full Stack)** | `lathishri@hirehub.ai` | `Candidate@123` | Fresh profile, starts at 0% completeness |
| **Candidate (Senior)** | `alex@candidate.com` | `Candidate@123` | Pre-populated profile, applications submitted |
| **Recruiter** | `sarah@techcorp.com` | `Recruiter@123` | Active job listings, incoming reverse hiring requests |
| **Administrator** | `admin@hirehub.ai` | `Admin@123` | System metrics, user management, SSR audit reports |
