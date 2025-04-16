import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../services/api';

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref({});
  const loading = ref(false);
  const error = ref(null);

  const fetchSettings = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get('/settings');
      settings.value = response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to load settings';
    } finally {
      loading.value = false;
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      const response = await api.put('/settings', newSettings);
      settings.value = response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Failed to update settings';
    }
  };

  return { settings, loading, error, fetchSettings, updateSettings };
});