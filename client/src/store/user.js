import { defineStore } from 'pinia';
import { ref } from 'vue';
import router from '../router';
import authService from '../services/auth';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const token = ref(localStorage.getItem('token') || null);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      user.value = response.user;
      token.value = response.token;
      localStorage.setItem('token', response.token);
      router.push('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      user.value = response.user;
      token.value = response.token;
      localStorage.setItem('token', response.token);
      router.push('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
    router.push('/login');
  };

  const fetchProfile = async () => {
    try {
      const userData = await authService.getProfile();
      user.value = userData;
    } catch (error) {
      logout();
    }
  };

  const initializeUser = async () => {
    if (token.value) {
      try {
        await fetchProfile(); // Fetch the user's profile if a token exists
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        logout(); // Log the user out if the token is invalid or the profile fetch fails
      }
    }
  };

  return { 
    user, 
    token,
    login, 
    register,
    logout, 
    fetchProfile,
    initializeUser 
  };
});