import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Code2, Users, Trophy, Home, Gift } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
}

interface NavbarProps {
  navigation: NavItem[];
}

const iconMap = {
  'Home': Home,
  'My Coins': Code2,
  'Members': Users,
  'Leaderboard': Trophy,
  'Contributions': Gift,
};

export default function Navbar({ navigation }: NavbarProps) {
  const { currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
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
    return null;
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
              {navigation.map((item) => {
                const Icon = iconMap[item.name as keyof typeof iconMap];
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`border-b-2 inline-flex items-center px-3 pt-1 text-sm font-medium transition-colors duration-200 space-x-1 ${
                      location.pathname === item.href
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-600 hover:border-indigo-500 hover:text-indigo-600'
                    }`}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="border-transparent text-gray-600 hover:border-indigo-500 hover:text-indigo-600 inline-flex items-center px-3 pt-1 border-b-2 text-sm font-medium transition-colors duration-200"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{currentUser.email}</span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}