import { api } from './';
import { API_URL } from '../constants';
import { User } from '../types';

const USERS_API_URL = `${API_URL}/users`;

export const registerUser = (user: User) => {
  return api.post(`${USERS_API_URL}/register`, { ...user });
};

export const authUser = (user: Pick<User, 'login' | 'password'>) => {
  return api.post(`${USERS_API_URL}/auth`, { ...user });
};
