import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Code2, Users, Trophy, Home } from 'lucide-react';
import ProfileMenu from './ProfileMenu'; // Assuming ProfileMenu is in the same directory

export default function Navbar() {
  const { currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up or at top - show navbar
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and not at top - hide navbar
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  if (!currentUser) {
    return null; // Don't show navbar on auth pages
  }

  return (
    <nav className={`bg-white shadow-lg fixed w-full top-0 z-50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src="/logo.svg"
                  alt="DevClub Logo"
                  className="h-8 w-auto"
                />
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-indigo-600">DevCoin</span>
                  <span className="text-xs text-gray-500">DevClub Portal</span>
                </div>
              </Link>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-6">
              <Link
                to="/"
                className="border-transparent text-gray-600 hover:border-indigo-500 hover:text-indigo-600 inline-flex items-center px-3 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 space-x-1"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link
                to="/coins"
                className="border-transparent text-gray-600 hover:border-indigo-500 hover:text-indigo-600 inline-flex items-center px-3 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 space-x-1"
              >
                <Code2 className="h-4 w-4" />
                <span>Dev Coins</span>
              </Link>
              <Link
                to="/members"
                className="border-transparent text-gray-600 hover:border-indigo-500 hover:text-indigo-600 inline-flex items-center px-3 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 space-x-1"
              >
                <Users className="h-4 w-4" />
                <span>Members</span>
              </Link>
              <Link
                to="/leaderboard"
                className="border-transparent text-gray-600 hover:border-indigo-500 hover:text-indigo-600 inline-flex items-center px-3 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 space-x-1"
              >
                <Trophy className="h-4 w-4" />
                <span>Leaderboard</span>
              </Link>
              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="border-transparent text-gray-600 hover:border-indigo-500 hover:text-indigo-600 inline-flex items-center px-3 pt-1 border-b-2 text-sm font-medium transition-colors duration-200"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ProfileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}