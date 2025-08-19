import React, { createContext, useContext, useState } from 'react';

interface AuthContextValue {
  token: string | null;
  email: string | null;
  signIn: (token: string, email: string) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const signIn = (newToken: string, newEmail: string) => {
    setToken(newToken);
    setEmail(newEmail);
  };

  return (
    <AuthContext.Provider value={{ token, email, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
