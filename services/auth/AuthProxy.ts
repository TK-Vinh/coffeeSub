import { AuthService, Credentials, AuthResponse, User } from './AuthService';

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

  async googleLogin(idToken: string): Promise<AuthResponse> {
    console.log('AuthProxy: googleLogin called');
    return this.service.googleLogin(idToken);
  }

  async currentUser(token: string): Promise<User> {
    console.log('AuthProxy: currentUser called');
    return this.service.currentUser(token);
  }
}
