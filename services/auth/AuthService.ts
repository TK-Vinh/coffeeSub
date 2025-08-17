export interface Credentials {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
}

/**
 * AuthService is responsible for communicating with the backend API.
 * In a real application these methods would use `fetch` or another
 * networking library. Here we simply mock the behaviour.
 */
export class AuthService {
  async signIn({ username, password }: Credentials): Promise<User> {
    // mock sign in
    return { id: '1', username };
  }

  async signUp({ username, password }: Credentials): Promise<User> {
    // mock sign up
    return { id: '1', username };
  }

  async signOut(): Promise<void> {
    // mock sign out
    return;
  }
}
