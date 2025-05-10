import axios from 'axios';

export const login = async (credentials="") => {
  console.log("logging in",credentials);
  return;
  // const response = await axios.post('/api/login', credentials);
  // return response.data;
};

export const logout = async () => {
  await axios.post('/api/logout');
};
