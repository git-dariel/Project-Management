import axios from 'axios';
import * as Yup from 'yup';

const BASE_URL = 'http://localhost:8000/api/users';
const userService = {
  getUserById: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${userId}`);
      return response.data.user;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to get user');
    }
  },

  registerUser: async (user) => {
    try {
      // Define Yup schema for user registration data
      const schema = Yup.object().shape({
        firstname: Yup.string().required('First name is required'),
        lastname: Yup.string().required('Last name is required'),
        role: Yup.string().required('Role is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
      });

      // Validate user data against the schema
      await schema.validate(user, { abortEarly: false });

      // If validation passes, make the registration request
      const response = await axios.post(`${BASE_URL}/signup`, user);
      return response.data;
    } catch (error) {
      // If validation fails or registration request fails, throw an error
      if (error.name === 'ValidationError') {
        // Handle Yup validation errors
        throw new Error(error.errors.join('\n'));
      } else {
        // Handle other errors (e.g., network errors)
        throw new Error(error.response.data.message || 'Failed to register user');
      }
    }
  },

  updateUser: async (user) => {
    try {
      const response = await axios.post(`${BASE_URL}/update/${user.id}`, user);
      return response.data.user;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to update user');
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${userId}`);
      return response.data.user;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to delete user');
    }
  },

  getUsers: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to get users');
    }
  },

  loginUser: async (credentials) => {
    try {
      // Define Yup schema for login credentials
      const schema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().required('Password is required'),
      });

      // Validate login credentials against the schema
      await schema.validate(credentials, { abortEarly: false });

      // If validation passes, make the login request
      const response = await axios.post(`${BASE_URL}/login`, credentials);
      return response.data.user;
    } catch (error) {
      // If validation fails or login request fails, throw an error
      if (error.name === 'ValidationError') {
        // Handle Yup validation errors
        throw new Error(error.errors.join('\n'));
      } else {
        // Handle other errors (e.g., network errors)
        throw new Error(error.response.data.message || 'Failed to login');
      }
    }
  },

  currentUser: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/current`);
      return response.data.user;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to get current user');
    }
  }
};

export default userService;
