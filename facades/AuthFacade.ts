import { AuthProxy } from '@/services/auth/AuthProxy';
import { Credentials, AuthResponse, User } from '@/services/auth/AuthService';

/**
 * Facade exposing simple authentication operations to the UI layer.
 */
export class AuthFacade {
  constructor(private proxy: AuthProxy = new AuthProxy()) {}

  signIn(credentials: Credentials): Promise<AuthResponse> {
    return this.proxy.signIn(credentials);
  }

  signUp(credentials: Credentials): Promise<AuthResponse> {
    return this.proxy.signUp(credentials);
  }

  currentUser(token: string): Promise<User> {
    return this.proxy.currentUser(token);
  }
}

export type { User };
