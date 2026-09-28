// Set EXPO_PUBLIC_API_BASE_URL in frontend/.env for deployed or physical-device builds.
// Example: EXPO_PUBLIC_API_BASE_URL=http://192.168.1.10:5000/api
export const API_BASE_URL = (process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:5000/api').replace(/\\/$/, '');

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

  // Switch lifecycle state (for testing edge cases)
  async overrideState(competitionId, statusOverride) {
    try {
      const res = await fetch(`${API_BASE_URL}/competitions/${competitionId}/override-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statusOverride }),
      });
      return await res.json();
    } catch (error) {
      console.error('API overrideState error:', error);
      throw error;
    }
  },

  // Reset demo state back to 1/20 booked
  async resetDemoState() {
    try {
      const res = await fetch(`${API_BASE_URL}/dev/reset`, { method: 'POST' });
      return await res.json();
    } catch (error) {
      console.error('API resetDemoState error:', error);
      throw error;
    }
  },
};

