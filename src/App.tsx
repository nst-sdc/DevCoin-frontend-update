import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import JoinPage from './pages/JoinPage';
import ProjectsPage from './pages/ProjectsPage'; // Import the new page
import EventsPage from './pages/EventsPage';
import ChallengesPage from './pages/ChallengesPage';
import CoinsPage from './pages/CoinsPage';
import MembersPage from './pages/MembersPage';
import LeaderboardPage from './pages/LeaderboardPage';
import SignInForm from './components/auth/SignInForm';
import SignUpForm from './components/auth/SignUpForm';
import AdminPanel from './components/admin/AdminPanel';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-grow pt-16 px-4 max-w-7xl mx-auto w-full">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/join" element={<JoinPage />} />
              <Route path="/projects" element={<ProjectsPage />} /> {/* Add the new route */}
              <Route path="/events" element={<EventsPage />} />
              <Route path="/challenges" element={<ChallengesPage />} />
              <Route path="/coins" element={<CoinsPage />} />
              <Route path="/members" element={<MembersPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="bottom-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;