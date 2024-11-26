import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { DevCoinProvider } from './context/DevCoinContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import HomePage from './pages/HomePage';
import CoinsPage from './pages/CoinsPage';
import MembersPage from './pages/MembersPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ContributionsPage from './pages/ContributionsPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminHome from './pages/admin/AdminHome';
import UserManagement from './pages/admin/UserManagement';
import CoinRequests from './pages/admin/CoinRequests';
import ContributionRequests from './pages/admin/ContributionRequests';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import { adminAuth } from './services/adminAuth';
import { useEffect } from 'react';

// Protected Route Component
function ProtectedRoute({ children, requireAdmin = false }: { children: React.ReactNode; requireAdmin?: boolean }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const isAdmin = adminAuth.isAuthenticated();
  const isAdminLoginPath = window.location.pathname === '/admin/login';

  useEffect(() => {
    // Don't require user authentication for admin login
    if (isAdminLoginPath) {
      return;
    }

    if (!currentUser) {
      navigate('/signin');
      return;
    }

    if (requireAdmin && !isAdmin) {
      navigate('/');
      return;
    }
  }, [currentUser, isAdmin, navigate, requireAdmin, isAdminLoginPath]);

  if (isAdminLoginPath) {
    return <>{children}</>;
  }

  if (!currentUser || (requireAdmin && !isAdmin)) {
    return null;
  }

  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <DevCoinProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Public Routes */}
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              
              {/* Admin Routes */}
              <Route
                path="/admin/login"
                element={
                  <ProtectedRoute>
                    <AdminLogin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminLayout>
                      <AdminHome />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminLayout>
                      <UserManagement />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/requests"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminLayout>
                      <CoinRequests />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/contributions"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminLayout>
                      <ContributionRequests />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/stats"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminLayout>
                      <div className="p-6">
                        <h1 className="text-2xl font-semibold text-gray-900">Statistics</h1>
                        <p className="mt-4 text-gray-600">Coming soon...</p>
                      </div>
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              
              {/* User Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <HomePage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/coins"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <CoinsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/members"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <MembersPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/leaderboard"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <LeaderboardPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/contributions"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ContributionsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </DevCoinProvider>
    </AuthProvider>
  );
}

export default App;