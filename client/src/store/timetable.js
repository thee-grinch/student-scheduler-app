import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../services/api';

export const useTimetableStore = defineStore('timetable', () => {
  const timetable = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchTimetable = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get('/timetable');
      timetable.value = response.data;
      console.log('Timetable fetched:', timetable.value);
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to load timetable';
    } finally {
      loading.value = false;
    }
  };

  const createTimetable = async () => {
    try {
      await api.post('/timetable'); // Call the backend to create a timetable
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to create timetable');
    }
  };

  return { timetable, loading, error, fetchTimetable, createTimetable };
});