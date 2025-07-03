import axios from 'axios';

// 🌐 Environment Variables
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// 🔐 Axios Instance with Defaults
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'EXTRABITE-API-KEY': API_KEY,
  },
});

// 🧠 Attach Authorization Token (If Logged In)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🚀 Wake up backend on platforms like Render
export const wakeBackend = async () => {
  try {
    await axios.get(BASE_URL.replace('/api', '') + '/welcome', {
      headers: { 'EXTRABITE-API-KEY': API_KEY },
    });
    console.log('✅ Backend is awake');
  } catch (err) {
    console.warn('⚠️ Wake-up failed:', err.message);
  }
};

/* 🔐 AUTHENTICATION */
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

export const logoutUser = async () => {
  const res = await api.post('/auth/logout');
  return res.data;
};

/* 👤 USER PROFILE */
export const getUserProfile = async () => {
  const res = await api.get('/user/profile');
  return res.data;
};

export const updateUserProfile = async (updateData) => {
  const res = await api.put('/user/update-profile', updateData);
  return res.data;
};

/* 📚 DIRECTORY */
export const searchUsers = async (params = {}) => {
  const res = await api.get('/directory/users/search', { params });
  return res.data;
};

/* 📊 USER ANALYTICS */
export const getUserAnalyticsSummary = async () => {
  const res = await api.get('/analytics/user/summary');
  return res.data;
};

export const getUserDonationsAnalytics = async () => {
  const res = await api.get('/analytics/user/donations');
  return res.data;
};

export const getUserRatingsAnalytics = async () => {
  const res = await api.get('/analytics/user/ratings');
  return res.data;
};

export const getUserFoodRequestsAnalytics = async () => {
  const res = await api.get('/analytics/user/food-requests');
  return res.data;
};

/* 📦 USER DONATIONS & REQUESTS */
export const getMyDonations = async () => {
  const res = await api.get('/donations/my-donations');
  return res.data;
};

export const getMyReceivedRequests = async () => {
  const res = await api.get('/requests/my-received-requests');
  return res.data;
};

/* 💼 ADMIN ANALYTICS */
export const getAdminPlatformSummary = async () => {
  const res = await api.get('/analytics/admin/summary');
  return res.data;
};

export const getAdminDonationsReport = async () => {
  const res = await api.get('/analytics/admin/donations');
  return res.data;
};

export const getAdminUsersReport = async () => {
  const res = await api.get('/analytics/admin/users');
  return res.data;
};

export const getAdminRequestedDonations = async () => {
  const res = await api.get('/analytics/admin/requested-donations');
  return res.data;
};

/* 🌍 PUBLIC ENDPOINTS */

// Get Top Donors (with optional filters)
export const getTopDonors = async ({ location = '', available = null } = {}) => {
  const params = {};
  if (location) params.location = location;
  if (available !== null) params.available = available;

  const res = await api.get('/analytics/public/top-donors', { params });
  return res.data;
};