import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import SignupSelection from './components/SignupSelection';
import CompanySignup from './components/CompanySignup';
import SeekerSignup from './components/SeekerSignup';
import SeekerLayout from './layouts/SeekerLayout';
import CompanyLayout from './layouts/CompanyLayout';
import AdminLayout from './layouts/AdminLayout';

// Company Pages
import CompanyDashboard from './pages/company/Dashboard';
import CompanyPostJob from './pages/company/PostJob';
import CompanyApplicants from './pages/company/Applicants';
import CompanyAIAnalyze from './pages/company/AIAnalyzeCandidates';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminJobs from './pages/admin/Jobs';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupSelection />} />
            <Route path="/signup/company" element={<CompanySignup />} />
            <Route path="/signup/seeker" element={<SeekerSignup />} />
            <Route
              path="/seeker/*"
              element={
                <ProtectedRoute allowedRoles={['seeker']}>
                  <SeekerLayout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company/*"
              element={
                <ProtectedRoute allowedRoles={['company']}>
                  <CompanyLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<CompanyDashboard />} />
              <Route path="post-job" element={<CompanyPostJob />} />
              <Route path="applications" element={<CompanyApplicants />} />
              <Route path="ai-analyze" element={<CompanyAIAnalyze />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="jobs" element={<AdminJobs />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;