import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, Member } from '../types';
import { useDevCoin } from './DevCoinContext';

interface AuthContextType {
  currentUser: AuthUser | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Omit<AuthUser, 'id'>) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const { addMember } = useDevCoin();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAdmin(user.isAdmin || false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: AuthUser) => u.email === email);

    if (!user || user.password !== password) { // In real app, use proper password hashing
      throw new Error('Invalid email or password');
    }

    setCurrentUser(user);
    setIsAdmin(user.isAdmin || false);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const signup = async (userData: Omit<AuthUser, 'id'>) => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    if (users.some((u: AuthUser) => u.email === userData.email)) {
      throw new Error('Email already exists');
    }

    // Create new user
    const newUser: AuthUser = {
      ...userData,
      id: `user-${Date.now()}`,
      isAdmin: false,
    };

    // Add to users list
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Create member profile
    const newMember: Member = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      github: newUser.github,
      linkedinId: newUser.linkedinId,
      role: newUser.role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newUser.name}`,
      devCoins: 0,
      contributions: [],
    };

    // Add member to DevCoin context
    addMember(newMember);

    // Auto-login after signup
    setCurrentUser(newUser);
    setIsAdmin(false);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAdmin, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
