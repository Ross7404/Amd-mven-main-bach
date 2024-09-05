import axios from 'axios';

const API_URL = 'http://localhost:3030/challenges';

// API Functions
export const apiFunctions = {
  // Function to fetch all challenges
  getChallenges: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching challenges:', error);
      throw error; // Rethrow the error to be handled in the component
    }
  },

  // Function to fetch a single challenge by ID
  getChallenge: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching challenge with ID ${id}:`, error);
      throw error; // Rethrow the error to be handled in the component
    }
  },

  // Function to create a new challenge
  createChallenge: async (challengeData) => {
    try {
      const response = await axios.post(API_URL, challengeData);
      return response.data;
    } catch (error) {
      console.error('Error creating challenge:', error);
      throw error; // Rethrow the error to be handled in the component
    }
  },

  // Function to update an existing challenge by ID
  updateChallenge: async (id, challengeData) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, challengeData);
      return response.data;
    } catch (error) {
      console.error(`Error updating challenge with ID ${id}:`, error);
      throw error; // Rethrow the error to be handled in the component
    }
  },

  // Function to delete a challenge by ID
  deleteChallenge: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting challenge with ID ${id}:`, error);
      throw error; // Rethrow the error to be handled in the component
    }
  }
};