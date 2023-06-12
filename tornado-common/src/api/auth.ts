import { User } from '../definitions';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
}
