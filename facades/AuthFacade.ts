import { AuthProxy } from '@/services/auth/AuthProxy';
import { Credentials, User } from '@/services/auth/AuthService';

/**
 * Facade exposing simple authentication operations to the UI layer.
 */
export class AuthFacade {
  constructor(private proxy: AuthProxy = new AuthProxy()) {}

  signIn(credentials: Credentials): Promise<User> {
    return this.proxy.signIn(credentials);
  }

  signUp(credentials: Credentials): Promise<User> {
    return this.proxy.signUp(credentials);
  }

  signOut(): Promise<void> {
    return this.proxy.signOut();
  }
}
