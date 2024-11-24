import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser } from '../types';

interface AuthContextType {
  currentUser: AuthUser | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Omit<AuthUser, 'id'>) => Promise<void>;
  logout: () => void;
  updateUserProfile: (updates: Partial<AuthUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setIsAdmin(user.isAdmin || false);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // For demo purposes, using localStorage to simulate a backend
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: AuthUser) => u.email === email);
      
      if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
      }

      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      setIsAdmin(user.isAdmin || false);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to login');
    }
  };

  const signup = async (userData: Omit<AuthUser, 'id'>) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      if (users.some((u: AuthUser) => u.email === userData.email)) {
        throw new Error('User already exists');
      }

      const newUser = {
        ...userData,
        id: Date.now().toString(),
        isAdmin: false
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Auto login after signup
      const { password: _, ...userWithoutPassword } = newUser;
      setCurrentUser(userWithoutPassword);
      setIsAdmin(false);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to sign up');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    localStorage.removeItem('currentUser');
  };

  const updateUserProfile = async (updates: Partial<AuthUser>) => {
    if (!currentUser) throw new Error('No user logged in');

    try {
      // Update in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: AuthUser) => u.id === currentUser.id);
      
      if (userIndex === -1) throw new Error('User not found');

      const updatedUser = { ...users[userIndex], ...updates };
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));

      // Update current user
      const { password: _, ...userWithoutPassword } = updatedUser;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to update profile');
    }
  };

  const value = {
    currentUser,
    isAdmin,
    login,
    signup,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
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
