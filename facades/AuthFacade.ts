import { AuthProxy } from '@/services/auth/AuthProxy';
import { Credentials, AuthResponse } from '@/services/auth/AuthService';

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

  signOut(): Promise<void> {
    return this.proxy.signOut();
  }
}
