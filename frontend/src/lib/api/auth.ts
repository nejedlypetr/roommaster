import { TUser } from '@/types/TUser';
import { TLoginForm } from '@/types/zodFormTypes/TZodLoginForm';
import axios from 'axios';

export const loginUser = async (data: TLoginForm): Promise<TUser> => {
  const response = await axios.post<TUser>('/login', data);
  return response.data;
}; 