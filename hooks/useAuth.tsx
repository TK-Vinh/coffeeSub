import { AuthFacade } from '@/facades/AuthFacade';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';
import React, { createContext, useContext, useEffect, useState } from 'react';
interface AuthContextValue {
  token: string | null;
  email: string | null;
  userId: number | null;
  signIn: (token: string, email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'authToken';
const EMAIL_KEY = 'authEmail';
const USER_ID_KEY = 'authUserId';

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
      return payload?.id ?? payload?.userId ?? payload?.nameid ?? null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const restore = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
        const storedEmail = await AsyncStorage.getItem(EMAIL_KEY);
        const storedUserId = await AsyncStorage.getItem(USER_ID_KEY);
        if (storedToken) {
          setToken(storedToken);
          let id = decodeUserId(storedToken);
          if (id === null) {
            try {
              const profile = await new AuthFacade().currentUser(storedToken);
              id = profile.id;
              await AsyncStorage.setItem(USER_ID_KEY, String(id));
            } catch {
              if (storedUserId) {
                id = parseInt(storedUserId, 10);
              }
            }
          }
          setUserId(id);
        } else if (storedUserId) {
          setUserId(parseInt(storedUserId, 10));
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
    try {
      const profile = await new AuthFacade().currentUser(newToken);
      setUserId(profile.id);
      await AsyncStorage.setItem(USER_ID_KEY, String(profile.id));
    } catch {
      const decoded = decodeUserId(newToken);
      setUserId(decoded);
      if (decoded !== null) {
        try {
          await AsyncStorage.setItem(USER_ID_KEY, String(decoded));
        } catch {
          // ignore storage errors
        }
      }
    }
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
