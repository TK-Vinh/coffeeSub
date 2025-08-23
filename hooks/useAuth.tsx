import React, { createContext, useContext, useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextValue {
  token: string | null;
  email: string | null;
  userId: number | null;
  signIn: (token: string, email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'authToken';
const EMAIL_KEY = 'authEmail';

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

      const rawId =
        payload?.id ??
        payload?.userId ??
        payload?.userID ??
        payload?.nameid ??
        payload?.sub ??
        payload?.Id ??
        payload?.UserId ??
        payload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

      if (typeof rawId === 'string') {
        const parsed = parseInt(rawId, 10);
        return Number.isNaN(parsed) ? null : parsed;
      }
      if (typeof rawId === 'number') {
        return rawId;
      }
      return null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const restore = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
        const storedEmail = await AsyncStorage.getItem(EMAIL_KEY);
        if (storedToken) {
          setToken(storedToken);
          setUserId(decodeUserId(storedToken));
        }
        if (storedEmail) {
          setEmail(storedEmail);
        }
      } catch {
        // ignore storage errors
      }
    };
    restore();
  }, []);

  const signIn = async (newToken: string, newEmail: string) => {
    setToken(newToken);
    setEmail(newEmail);
    setUserId(decodeUserId(newToken));
    try {
      await AsyncStorage.setItem(TOKEN_KEY, newToken);
      await AsyncStorage.setItem(EMAIL_KEY, newEmail);
    } catch {
      // ignore storage errors
    }
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
