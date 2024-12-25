import React, { createContext, useContext, useEffect, useState } from 'react';
import { signIn, signUp, signOut as authSignOut, getCurrentSession } from '../services/auth';
import type { User, SignInData, SignUpData, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const currentUser = getCurrentSession();
    setState({
      user: currentUser,
      loading: false,
      error: null,
    });
  }, []);

  const value = {
    ...state,
    signIn: async (data: SignInData) => {
      try {
        const user = await signIn(data);
        setState({ user, loading: false, error: null });
      } catch (error: any) {
        setState({ user: null, loading: false, error: error.message });
        throw error;
      }
    },
    signUp: async (data: SignUpData) => {
      try {
        const user = await signUp(data);
        setState({ user, loading: false, error: null });
      } catch (error: any) {
        setState({ user: null, loading: false, error: error.message });
        throw error;
      }
    },
    signOut: async () => {
      try {
        await authSignOut();
        setState({ user: null, loading: false, error: null });
      } catch (error: any) {
        setState(prev => ({ ...prev, error: error.message }));
        throw error;
      }
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}