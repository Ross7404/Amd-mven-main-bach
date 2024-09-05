<template>
  <!-- Challenge Form -->
  <div>
    <h2>{{ isEditMode ? 'Edit Challenge' : 'New Challenge' }}</h2>
    <form @submit.prevent="saveChallenge">
      <!-- Description Field -->
      <div>
        <label for="description">Description:</label>
        <input type="text" v-model="challenge.description" required>
      </div>
      <!-- Difficulty Field -->
      <div>
        <label for="difficulty">Difficulty:</label>
        <select v-model="challenge.difficulty" required>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>
      <!-- Scoring Criteria Field -->
      <div>
        <label for="scoringCriteria">Scoring Criteria:</label>
        <input type="text" v-model="challenge.scoringCriteria" required>
      </div>
      <!-- Submit Button -->
      <button type="submit">{{ isEditMode ? 'Update' : 'Create' }} Challenge</button>
    </form>
  </div>
</template>

<script>
import { createChallenge, getChallenge, updateChallenge } from '@/services/challengeService'

export default {
  data() {
    return {
      challenge: {
        description: '',
        difficulty: '',
        scoringCriteria: ''
      },
      isEditMode: false
    }
  },

  // Lifecycle Hook: Created
  async created() {
    if (this.$route.params.id) {
      this.isEditMode = true
      this.challenge = await getChallenge(this.$route.params.id)
    }
  },

  // Methods
  methods: {
    async saveChallenge() {
      if (this.isEditMode) {
        await updateChallenge(this.$route.params.id, this.challenge)
      } else {
        await createChallenge(this.challenge)
      }
      this.$router.push('/challenges')
    }
  }
}
</script>