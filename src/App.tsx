import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CoinsPage from './pages/CoinsPage';
import MembersPage from './pages/MembersPage';
import LeaderboardPage from './pages/LeaderboardPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-16 px-4 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coins" element={<CoinsPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;