import api from '@/lib/api';
import { getAccessToken, setTokens, removeTokens } from '@/lib/auth';

export const authService = {
  async login(data: any) {
    // Placeholder implementation for FastAPI OAuth2PasswordBearer
    /*
    const formData = new URLSearchParams();
    formData.append('username', data.email);
    formData.append('password', data.password);
    
    const response = await api.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const { access_token, refresh_token } = response.data;
    setTokens(access_token, refresh_token);
    return response.data;
    */
    
    // Mock response for now
    return { access_token: 'mock_token', user: { id: 'mock', email: data.email, username: 'MockUser' } };
  },

  async register(data: any) {
    // const response = await api.post('/auth/register', data);
    // return response.data;
    return { success: true };
  },

  async logout() {
    // Optional: Call backend to invalidate token
    // await api.post('/auth/logout');
    removeTokens();
  },

  async getCurrentUser() {
    const token = getAccessToken();
    if (!token) return null;

    try {
      // const response = await api.get('/auth/me');
      // return response.data;
      return { id: 'mock', email: 'user@example.com', username: 'MockUser' };
    } catch (error) {
      removeTokens();
      throw error;
    }
  },

  async refreshToken() {
    // Placeholder for token refresh logic
    /*
    const refresh_token = getRefreshToken();
    if (!refresh_token) throw new Error('No refresh token');

    const response = await api.post('/auth/refresh', { refresh_token });
    const { access_token, refresh_token: new_refresh_token } = response.data;
    setTokens(access_token, new_refresh_token);
    return access_token;
    */
    return null;
  }
};
