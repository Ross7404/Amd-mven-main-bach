<template>
  <!-- Challenges List -->
  <div>
    <h2>Challenges</h2>
    <!-- Error Message -->
    <p v-if="error">{{ error }}</p>
    <!-- Challenges List -->
    <ul v-if="!loading && !error">
      <li v-for="challenge in challenges" :key="challenge._id">
        {{ challenge.description }} - {{ challenge.difficulty }}
        <!-- Edit Button -->
        <button @click="editChallenge(challenge._id)">Edit</button>
        <!-- Delete Button -->
        <button @click="removeChallenge(challenge._id)">Delete</button>
      </li>
    </ul>
    <!-- Add New Challenge Button -->
    <button @click="newChallenge">Add New Challenge</button>
    <!-- Loading Indicator -->
    <p v-if="loading">Loading...</p>
  </div>
</template>

<script>
import { getChallenges, deleteChallenge } from '@/services/challengeService'

export default {
  data() {
    return {
      challenges: [],
      error: null,
      loading: true
    }
  },

  // Lifecycle Hook: Created
  async created() {
    try {
      this.challenges = await getChallenges()
    } catch (error) {
      this.error = 'Failed to load challenges. Please try again later.'
      console.error('Error fetching challenges:', error)
    } finally {
      this.loading = false
    }
  },

  // Methods
  methods: {
    // Edit Challenge
    editChallenge(id) {
      this.$router.push(`/challenges/edit/${id}`)
    },
    // Remove Challenge
    async removeChallenge(id) {
      try {
        await deleteChallenge(id)
        this.challenges = this.challenges.filter(challenge => challenge._id !== id)
      } catch (error) {
        this.error = 'Failed to delete challenge. Please try again later.'
        console.error('Error deleting challenge:', error)
      }
    },
    // New Challenge
    newChallenge() {
      this.$router.push('/challenges/new')
    }
  }
}
</script>

<style scoped>
/* Add any specific styles for your component here */
</style>