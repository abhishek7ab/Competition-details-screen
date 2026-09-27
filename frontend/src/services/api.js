import { Platform } from 'react-native';

// In Web and local simulators, localhost:5000 works.
// On physical mobile devices, replace with your local IP (e.g., http://192.168.1.X:5000)
export const API_BASE_URL = 'http://localhost:5000/api';

export const apiService = {
  // Fetch competition details with user state
  async getCompetition(userId) {
    try {
      const url = userId
        ? `${API_BASE_URL}/competitions/default?userId=${userId}`
        : `${API_BASE_URL}/competitions/default`;
      const res = await fetch(url);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to fetch competition');
      return json.data;
    } catch (error) {
      console.error('API getCompetition error:', error);
      throw error;
    }
  },

  // Register user for competition
  async registerForCompetition(competitionId, userId) {
    try {
      const res = await fetch(`${API_BASE_URL}/competitions/${competitionId}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Registration failed');
      return json;
    } catch (error) {
      console.error('API register error:', error);
      throw error;
    }
  },

  // Submit dance entry
  async submitEntry(competitionId, data) {
    try {
      const res = await fetch(`${API_BASE_URL}/competitions/${competitionId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Submission failed');
      return json;
    } catch (error) {
      console.error('API submit error:', error);
      throw error;
    }
  },

  // Get demo users to toggle between
  async getDemoUsers() {
    try {
      const res = await fetch(`${API_BASE_URL}/users`);
      const json = await res.json();
      return json.data || [];
    } catch (error) {
      console.error('API getDemoUsers error:', error);
      return [];
    }
  },
};

