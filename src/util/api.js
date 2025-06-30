import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'EXTRABITE-API-KEY': API_KEY,
  },
});

// Wake up the backend
export async function wakeBackend() {
  try {
    await axios.get(BASE_URL.replace('/api', '') + '/welcome');
    console.log('🚀 Backend awake');
  } catch (err) {
    console.warn('⚠️ Wake-up failed:', err.message);
  }
}

export const registerUser = async (formData) => {
  const res = await api.post('/auth/register', formData);
  return res.data;
};

export const loginUser = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  return res.data;
};

export const resetPassword = async ({ email, contactNumber, newPassword }) => {
  const res = await api.post('/auth/reset-password', {
    email,
    contactNumber,
    newPassword,
  });
  return res.data;
};
