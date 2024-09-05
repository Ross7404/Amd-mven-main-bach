import { createRouter, createWebHistory } from 'vue-router';
import ChallengesList from '@/views/ChallengesList.vue';
import ChallengeForm from '@/views/ChallengeForm.vue';

const routes = [
  { path: '/', redirect: '/challenges' },
  { path: '/challenges', component: ChallengesList },
  { path: '/challenges/new', component: ChallengeForm },
  { path: '/challenges/edit/:id', component: ChallengeForm }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
