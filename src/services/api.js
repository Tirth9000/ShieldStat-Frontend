import axios from 'axios';

<<<<<<< HEAD
// API Configuration & Calls
=======
// Create an Axios instance with your backend base URL
>>>>>>> dc323aa (nev and assessment)
const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

<<<<<<< HEAD
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const api = {
=======
// Define your API calls
export const api = {
  // Fetch all questions
>>>>>>> dc323aa (nev and assessment)
  getQuestions: async () => {
    const response = await apiClient.get('/api/questions');
    return response.data;
  },

<<<<<<< HEAD
=======
  // Submit assessment answers
>>>>>>> dc323aa (nev and assessment)
  submitAssessment: async (payload) => {
    const response = await apiClient.post('/api/assess', payload);
    return response.data;
  },

<<<<<<< HEAD
  getHistory: async () => {
    const response = await apiClient.get('/api/assess/history');
    return response.data;
  },

  login: async (credentials) => {
    const response = await apiClient.post('/api/auth/login', credentials);
    return response.data;
  },

  register: async (userInfo) => {
    const response = await apiClient.post('/api/auth/register', userInfo);
    return response.data;
  },

  getProfile: async (_id) => {
    const response = await apiClient.get(`/api/auth/profile/${_id}`);
    return response.data;
  },

=======
  // Get history for the dashboard
  getHistory: async () => {
    const response = await apiClient.get('/api/assess/history');
    return response.data;
  }
>>>>>>> dc323aa (nev and assessment)
};

export default api;