import React, { createContext, useContext, useState } from 'react';
import { Buffer } from 'buffer';

interface AuthContextValue {
  token: string | null;
  email: string | null;
  userId: number | null;
  signIn: (token: string, email: string) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  const decodeUserId = (jwt: string): number | null => {
    try {
      const base64Url = jwt.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = Buffer.from(base64, 'base64').toString('utf-8');
      const payload = JSON.parse(jsonPayload);
      return (
        payload?.id ?? payload?.userId ?? payload?.nameid ?? null
      );
    } catch {
      return null;
    }
  };

  const signIn = (newToken: string, newEmail: string) => {
    setToken(newToken);
    setEmail(newEmail);
    setUserId(decodeUserId(newToken));
  };

  return (
    <AuthContext.Provider value={{ token, email, userId, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
