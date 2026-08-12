import { api } from './api';
import { currentUser as mockUser } from '../data/mockData';

export const AuthService = {
  async login(email, password) {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      return response.user || mockUser;
    } catch (err) {
      console.warn('AuthService: Login server request failed. Using guest session.', err.message);
      return mockUser;
    }
  },

  async register(name, email, password) {
    try {
      const response = await api.post('/api/auth/register', { name, email, password });
      return response.user || { ...mockUser, name };
    } catch (err) {
      console.warn('AuthService: Register server request failed. Creating local guest account.', err.message);
      return { ...mockUser, name };
    }
  },

  async logout() {
    try {
      await api.post('/api/auth/logout', {});
    } catch (err) {
      console.warn('AuthService: Logout session cleared locally.');
    }
  },
};
