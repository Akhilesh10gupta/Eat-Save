// src/util/auth.js

// 🔐 Check if user is logged in
export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};

// 👤 Get user role
export const getUserRole = () => {
  return localStorage.getItem('role');
};

// 🔓 Logout function
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.clear(); // Optionally clear everything
};

// 🧠 Get token (if needed elsewhere for API headers)
export const getToken = () => {
  return localStorage.getItem('token');
};
