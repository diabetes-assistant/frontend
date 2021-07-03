import { postUser } from '../data/userClient';

export interface User {
  id: string;
  email: string;
}

export function registerUser(email: string, password: string): Promise<User> {
  return postUser(email, password).then((dto) => ({
    id: dto.id,
    email: dto.email,
  }));
}
