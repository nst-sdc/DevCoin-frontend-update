import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DevCoinProvider } from './context/DevCoinContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CoinsPage from './pages/CoinsPage';
import MembersPage from './pages/MembersPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

// Protected Route Component
function ProtectedRoute({ children, requireAdmin = false }: { children: React.ReactNode; requireAdmin?: boolean }) {
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <DevCoinProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/coins"
                element={
                  <ProtectedRoute>
                    <CoinsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/members"
                element={
                  <ProtectedRoute>
                    <MembersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/leaderboard"
                element={
                  <ProtectedRoute>
                    <LeaderboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/login"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminLogin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </DevCoinProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;