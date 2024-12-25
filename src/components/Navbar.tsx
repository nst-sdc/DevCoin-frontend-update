import React from 'react';
import { Code2, Users, Trophy, Home, LogIn, LogOut, UserPlus } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Successfully signed out');
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-indigo-600" />
            <span className="font-bold text-xl">Dev Club</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <div className="flex space-x-4">
              <NavLink to="/" icon={<Home />} text="Home" active={isActive('/')} />
              <NavLink to="/coins" icon={<Code2 />} text="Dev Coins" active={isActive('/coins')} />
              <NavLink to="/members" icon={<Users />} text="Members" active={isActive('/members')} />
              <NavLink to="/leaderboard" icon={<Trophy />} text="Leaderboard" active={isActive('/leaderboard')} />
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  {user.role === 'admin' || user.role === 'super_admin' ? (
                    <NavLink 
                      to="/admin" 
                      icon={<Code2 />} 
                      text="Admin" 
                      active={isActive('/admin')} 
                    />
                  ) : null}
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/signin"
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, text, active }: { to: string; icon: React.ReactNode; text: string; active: boolean }) {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
        ${active 
          ? 'text-indigo-600 bg-indigo-50' 
          : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
        }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}