// Central place for the backend API URL.
//
// In local development this falls back to your local backend.
// In production (Render), set the VITE_API_URL environment variable
// to your deployed backend's URL, e.g. https://Ziveline-backend.onrender.com
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";