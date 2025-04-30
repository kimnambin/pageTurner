import {SignupProps} from '../pages/Signup';
import {httpClient} from './http';

export const signup = async (userData: SignupProps) => {
  const res = await httpClient.post('/users/joinup', userData);

  return res.data;
};

export const resetRequest = async (data: SignupProps) => {
  const res = await httpClient.post('/users/reset', data);

  return res.data;
};

export const resetPassword = async (data: SignupProps) => {
  const res = await httpClient.put('/users/reset', data);

  return res.data;
};

interface LoginRes {
  token: string;
}

export const login = async (data: SignupProps) => {
  const res = await httpClient.post<LoginRes>('/users/login', data);

  return res.data;
};
