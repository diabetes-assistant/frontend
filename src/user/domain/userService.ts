export interface User {
  id: string;
  email: string;
}

export function createUser(_email: string, _password: string): Promise<User> {
  return Promise.reject(new Error(''));
}
