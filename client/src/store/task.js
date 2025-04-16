import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTaskStore = defineStore('tasks', () => {
    const tasks = ref([]);
    const loading = ref(false);
    const error = ref(null);
  
    const fetchTasks = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await api.get('/tasks');
        tasks.value = response.data;
      } catch (err) {
        error.value = err.response?.data?.message || 'Failed to load tasks';
      } finally {
        loading.value = false;
      }
    };
  
    return { tasks, loading, error, fetchTasks };
  });