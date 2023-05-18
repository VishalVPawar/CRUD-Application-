import react from  'react'

import axios from 'axios';
export const login = async (email: string, password: string): Promise<string> => {
  const response = await axios.post('http://localhost:3000/login', { email, password });
  return response.data.token;
};
export const logout = async (): Promise<void>=> {
  await axios.post('/api/logout');
};