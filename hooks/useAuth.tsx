import React, { createContext, useContext, useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthFacade } from '@/facades/AuthFacade';

interface AuthContextValue {
  token: string | null;
  email: string | null;
  userId: number | null;
  signIn: (token: string, email: string) => Promise<void>;
  signOut: () => Promise<void>;
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
          let id = decodeUserId(storedToken);
          if (id === null) {
            try {
              const profile = await new AuthFacade().currentUser(storedToken);
              id = profile.id;
              await AsyncStorage.setItem(USER_ID_KEY, String(id));
            } catch {
              if (storedUserId) {
                id = parseInt(storedUserId, 10);
              } else {
                await AsyncStorage.multiRemove([TOKEN_KEY, EMAIL_KEY]);
                return;
              }
            }
          }

          setToken(storedToken);
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
    try {
      const profile = await new AuthFacade().currentUser(newToken);
      setToken(newToken);
      setEmail(newEmail);
      setUserId(profile.id);
      await AsyncStorage.multiSet([
        [TOKEN_KEY, newToken],
        [EMAIL_KEY, newEmail],
        [USER_ID_KEY, String(profile.id)],
      ]);
    } catch {
      const decoded = decodeUserId(newToken);
      if (decoded === null) {
        throw new Error('Unable to fetch profile');
      }
      setToken(newToken);
      setEmail(newEmail);
      setUserId(decoded);
      try {
        await AsyncStorage.multiSet([
          [TOKEN_KEY, newToken],
          [EMAIL_KEY, newEmail],
          [USER_ID_KEY, String(decoded)],
        ]);
      } catch {
        // ignore storage errors
      }
    }
  };

  const signOut = async () => {
    setToken(null);
    setEmail(null);
    setUserId(null);
    try {
      await AsyncStorage.multiRemove([TOKEN_KEY, EMAIL_KEY, USER_ID_KEY]);
    } catch {
      // ignore storage errors
    }
  };

  return (
    <AuthContext.Provider value={{ token, email, userId, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
