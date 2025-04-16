<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 class="text-lg font-semibold mb-4 dark:text-white">Study Hours</h3>
      <Bar :data="studyHoursData" :options="{ responsive: true }" />
    </div>
    
    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 class="text-lg font-semibold mb-4 dark:text-white">Task Completion</h3>
      <Pie :data="taskCompletionData" :options="{ responsive: true }" />
    </div>
  </div>
</template>

<script setup>
import { Bar, Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import { ref, onMounted } from 'vue';
import api from '../services/api';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const studyHoursData = ref({
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Study Hours',
    data: [3, 2, 4, 3, 2, 5, 4],
    backgroundColor: 'rgba(59, 130, 246, 0.5)'
  }]
});

const taskCompletionData = ref({
  labels: ['Completed', 'Pending', 'Overdue'],
  datasets: [{
    data: [12, 5, 3],
    backgroundColor: ['#10B981', '#F59E0B', '#EF4444']
  }]
});

onMounted(async () => {
  const response = await api.get('/analytics');
  // Update data with actual response
});
</script>