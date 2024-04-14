import axios from 'axios';

const BASE_URL = 'https://project-management-server-1ffi.onrender.com/api';
// const BASE_URL = 'http://localhost:8000/api';

const userService = {
  // validation function
  setAuthToken: (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/get/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get user');
    }
  },

  registerUser: async (user) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/create`, user);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to register user');
    }
  },

  updateUser: async (user) => {
    try {
      const response = await axios.put(`${BASE_URL}/user/update/${user.id}`, user);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update user');
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/user/remove/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete user');
    }
  },

  getUsers: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/get/all`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get users');
    }
  },

  loginUser: async (credentials) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, credentials);
      const { accessToken } = response.data;
      userService.setAuthToken(accessToken); // Set JWT token in headers
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to login');
    }
  },

  currentUser: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/current/login`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get current user');
    }
  },
};

export default userService;
