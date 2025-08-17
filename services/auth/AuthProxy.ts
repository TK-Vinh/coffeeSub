import { AuthService, Credentials, AuthResponse } from './AuthService';

/**
 * Proxy that can be used to attach headers, tokens or logging
 * before delegating calls to the underlying AuthService.
 */
export class AuthProxy {
  constructor(private service: AuthService = new AuthService()) {}

  async signIn(credentials: Credentials): Promise<AuthResponse> {
    // Example: add logging
    console.log('AuthProxy: signIn called');
    return this.service.signIn(credentials);
  }

  async signUp(credentials: Credentials): Promise<AuthResponse> {
    console.log('AuthProxy: signUp called');
    return this.service.signUp(credentials);
  }

  async signOut(): Promise<void> {
    console.log('AuthProxy: signOut called');
    return this.service.signOut();
  }
}
