import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'

axios.defaults.withCredentials = true;

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,
  }),
  actions: {
    async signup(email, password, name) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.post(`${API_URL}/signup`, { email, password, name });
        this.user = response.data.user;
        this.isAuthenticated = true;
        this.isLoading = false;
      } catch (error) {
        this.error = error.response?.data?.message || 'Error signing up';
        this.isLoading = false;
        throw error;
      }
    },
    async login(email, password) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        this.user = response.data.user;
        this.isAuthenticated = true;
        this.isLoading = false;
      } catch (error) {
        this.error = error.response?.data?.message || 'Error logging in';
        this.isLoading = false;
        throw error;
      }
    },
    async logout() {
      this.isLoading = true;
      this.error = null;
      try {
        await axios.post(`${API_URL}/logout`);
        this.user = null;
        this.isAuthenticated = false;
        this.isLoading = false;
      } catch (error) {
        this.error = 'Error logging out';
        this.isLoading = false;
        throw error;
      }
    },
    async verifyEmail(code) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.post(`${API_URL}/verify-email`, { code });
        this.user = response.data.user;
        this.isAuthenticated = true;
        this.isLoading = false;
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Error verifying email';
        this.isLoading = false;
        throw error;
      }
    },
    async checkAuth() {
      this.isCheckingAuth = true;
      this.error = null;
      try {
        const response = await axios.get(`${API_URL}/check-auth`);
        this.user = response.data.user;
        this.isAuthenticated = true;
        this.isCheckingAuth = false;
      } catch (error) {
        this.error = null;
        this.isCheckingAuth = false;
        this.isAuthenticated = false;
      }
    },
    async forgotPassword(email) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.post(`${API_URL}/forgot-password`, { email });
        this.message = response.data.message;
        this.isLoading = false;
      } catch (error) {
        this.error = error.response?.data?.message || 'Error sending reset password email';
        this.isLoading = false;
        throw error;
      }
    },
    async resetPassword(token, password) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
        this.message = response.data.message;
        this.isLoading = false;
      } catch (error) {
        this.error = error.response?.data?.message || 'Error resetting password';
        this.isLoading = false;
        throw error;
      }
    },
  },
});
