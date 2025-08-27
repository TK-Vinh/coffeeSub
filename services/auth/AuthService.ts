export interface Credentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  userSubscriptions: {
    subscriptionId: number;
    planId: number;
    startDate: string;
    endDate: string;
    remainingCups: number;
    isActive: boolean;
  };
}

/**
 * AuthService is responsible for communicating with the backend API.
 * In a real application these methods would use `fetch` or another
 * networking library. Here we simply mock the behaviour.
 */
import { fetchWithErrorHandling } from '../api';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export class AuthService {
  async signIn({ email, password }: Credentials): Promise<AuthResponse> {
    if (!API_URL) {
      throw new Error('Missing API URL');
    }

    const res = await fetchWithErrorHandling(`${API_URL}/Auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error('Failed to sign in');
    }

    const json = await res.json();
    if (!json?.data?.token) {
      throw new Error('Token not found');
    }

    return { token: json.data.token };
  }

  async signUp({ email, password }: Credentials): Promise<AuthResponse> {
    // sign up not implemented; return empty token
    return { token: '' };
  }

  async googleLogin(idToken: string): Promise<AuthResponse> {
    if (!API_URL) {
      throw new Error('Missing API URL');
    }

    const res = await fetchWithErrorHandling(`${API_URL}/Auth/google-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });

    if (!res.ok) {
      throw new Error('Failed to sign in with Google');
    }

    const json = await res.json();
    if (!json?.data?.token) {
      throw new Error('Token not found');
    }

    return { token: json.data.token };
  }

  async currentUser(token: string): Promise<User> {
    if (!API_URL) {
      throw new Error('Missing API URL');
    }

    const res = await fetchWithErrorHandling(`${API_URL}/Auth/current-logged-user`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch user');
    }

    const json = await res.json();
    if (!json?.data) {
      throw new Error('User not found');
    }

    return json.data as User;
  }
}
