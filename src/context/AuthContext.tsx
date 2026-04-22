import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, loginWithGoogle, logout } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async () => {
    if (isAuthenticating) return user as User;
    setIsAuthenticating(true);
    try {
      const loggedInUser = await loginWithGoogle();
      return loggedInUser as User;
    } catch (error: any) {
      // Handle common auth errors with user feedback
      if (error?.code === 'auth/cancelled-popup-request' || error?.code === 'auth/popup-closed-by-user') {
        console.log('Login cancelled by user');
      } else if (error?.code === 'auth/popup-blocked') {
        alert('Authentication popup was blocked by your browser. Please allow popups for this site and try again.');
      } else {
        console.error('Auth Error:', error);
        alert(`Authentication failed: ${error.message || 'Unknown error'}`);
      }
      throw error;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
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
