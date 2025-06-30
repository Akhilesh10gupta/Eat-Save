import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// 🔐 Create Axios instance with base headers
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'EXTRABITE-API-KEY': API_KEY,
  },
});

// ✅ Attach Authorization token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🚀 Wake up the backend (Render workaround)
export async function wakeBackend() {
  try {
    await axios.get(BASE_URL.replace('/api', '') + '/welcome', {
      headers: { 'EXTRABITE-API-KEY': API_KEY },
    });
    console.log('✅ Backend is awake');
  } catch (err) {
    console.warn('⚠️ Wake-up failed:', err.message);
  }
}

// 📝 Register a new user
export const registerUser = async (formData) => {
  const res = await api.post('/auth/register', formData);
  return res.data;
};

// 🔐 Login user
export const loginUser = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  return res.data;
};

// 🔑 Forgot/Reset password
export const resetPassword = async ({ email, contactNumber, newPassword }) => {
  const res = await api.post('/auth/reset-password', {
    email,
    contactNumber,
    newPassword,
  });
  return res.data;
};

// 📥 Get current user's profile
export const getUserProfile = async () => {
  const res = await api.get('/user/profile');
  return res.data;
};

// 📤 Update user profile
export const updateUserProfile = async (updateData) => {
  const res = await api.put('/user/update-profile', updateData);
  return res.data;
};
