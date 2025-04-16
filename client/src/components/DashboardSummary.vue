<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 class="text-lg font-semibold mb-2">Today's Classes</h3>
      <ul v-for="cls in todaysClasses" :key="cls._id">
        <li>{{ cls.subject }} at {{ cls.time }}</li>
      </ul>
    </div>
    
    <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 class="text-lg font-semibold mb-2">Upcoming Tasks</h3>
      <TaskList :tasks="pendingTasks" />
    </div>
    
    <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <button @click="generatePlan" class="btn-primary">
        Generate Study Plan
      </button>
      <div v-if="aiPlan" class="mt-4">
        <h4 class="font-medium">AI Recommendations</h4>
        <pre>{{ aiPlan }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../store/useUserStore';
import api from '../services/api';

const { user } = useUserStore();
const aiPlan = ref(null);

const generatePlan = async () => {
  const response = await api.post('/ai/plan');
  aiPlan.value = response.data;
};
</script>