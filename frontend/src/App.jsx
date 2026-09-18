import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkAuth } from './redux/slices/authSlice';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import NotFoundPage from './pages/NotFoundPage';

// Candidate Pages
import CandidateDashboard from './pages/candidate/Dashboard';
import CandidateProfile from './pages/candidate/Profile';
import ResumeAnalyzer from './pages/candidate/ResumeAnalyzer';
import SkillGapPage from './pages/candidate/SkillGap';
import CareerPathPage from './pages/candidate/CareerPath';
import CareerSimulator from './pages/candidate/CareerSimulator';
import MyApplications from './pages/candidate/Applications';
import SavedJobs from './pages/candidate/SavedJobs';
import ReverseHiringCandidate from './pages/candidate/ReverseHiring';
import CandidateInterviews from './pages/candidate/Interviews';

// Recruiter Pages
import RecruiterDashboard from './pages/recruiter/Dashboard';
import RecruiterProfile from './pages/recruiter/Profile';
import RecruiterJobs from './pages/recruiter/Jobs';
import CreateJob from './pages/recruiter/CreateJob';
import JobApplicants from './pages/recruiter/Applicants';
import CandidatesList from './pages/recruiter/Candidates';
import ReverseHiringRecruiter from './pages/recruiter/ReverseHiring';
import RecruiterInterviews from './pages/recruiter/Interviews';
import RecruiterAnalytics from './pages/recruiter/Analytics';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminReports from './pages/admin/Reports';

// Guards
import ProtectedRoute from './routes/ProtectedRoute';
import RoleRoute from './routes/RoleRoute';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
      </Route>

      {/* Candidate Protected Portal */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute allowedRoles={['candidate']} />}>
          <Route element={<DashboardLayout role="candidate" />}>
            <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
            <Route path="/candidate/profile" element={<CandidateProfile />} />
            <Route path="/candidate/resume" element={<ResumeAnalyzer />} />
            <Route path="/candidate/skill-gap" element={<SkillGapPage />} />
            <Route path="/candidate/career-path" element={<CareerPathPage />} />
            <Route path="/candidate/simulator" element={<CareerSimulator />} />
            <Route path="/candidate/applications" element={<MyApplications />} />
            <Route path="/candidate/saved-jobs" element={<SavedJobs />} />
            <Route path="/candidate/reverse-hiring" element={<ReverseHiringCandidate />} />
            <Route path="/candidate/interviews" element={<CandidateInterviews />} />
          </Route>
        </Route>
      </Route>

      {/* Recruiter Protected Portal */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute allowedRoles={['recruiter']} />}>
          <Route element={<DashboardLayout role="recruiter" />}>
            <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
            <Route path="/recruiter/profile" element={<RecruiterProfile />} />
            <Route path="/recruiter/jobs" element={<RecruiterJobs />} />
            <Route path="/recruiter/jobs/create" element={<CreateJob />} />
            <Route path="/recruiter/applicants" element={<JobApplicants />} />
            <Route path="/recruiter/candidates" element={<CandidatesList />} />
            <Route path="/recruiter/reverse-hiring" element={<ReverseHiringRecruiter />} />
            <Route path="/recruiter/interviews" element={<RecruiterInterviews />} />
            <Route path="/recruiter/analytics" element={<RecruiterAnalytics />} />
          </Route>
        </Route>
      </Route>

      {/* Admin Protected Portal */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute allowedRoles={['admin']} />}>
          <Route element={<DashboardLayout role="admin" />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/reports" element={<AdminReports />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
