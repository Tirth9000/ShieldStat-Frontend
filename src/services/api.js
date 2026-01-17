import axios from 'axios';

// API Configuration & Calls
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

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
  getQuestions: async () => {
    const response = await apiClient.get('/api/questions');
    return response.data;
  },

  submitAssessment: async (payload) => {
    const response = await apiClient.post('/api/assess', payload);
    return response.data;
  },

  getHistory: async () => {
    const response = await apiClient.get('/api/assess/history');
    // console.log("this from history", response);
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

  downloadAssessmentPDF: async(_id )=> {
    const response = await apiClient.get(`/api/assess/${_id}/download`, {
      responseType: 'blob',
    });

    return response.data;
  }
};

export default api;