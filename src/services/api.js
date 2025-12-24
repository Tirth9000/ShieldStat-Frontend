import axios from 'axios';

// Create an Axios instance with your backend base URL
const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define your API calls
export const api = {
  // Fetch all questions
  getQuestions: async () => {
    const response = await apiClient.get('/api/questions');
    return response.data;
  },

  // Submit assessment answers
  submitAssessment: async (payload) => {
    const response = await apiClient.post('/api/assess', payload);
    return response.data;
  },

  // Get history for the dashboard
  getHistory: async () => {
    const response = await apiClient.get('/api/assess/history');
    return response.data;
  }
};

export default api;