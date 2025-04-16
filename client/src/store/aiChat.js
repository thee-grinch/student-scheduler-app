import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../services/api';

export const useAIChatStore = defineStore('aiChat', () => {
  const messages = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const sendMessage = async (message) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.post('/ai/chat', { message });
      messages.value.push({ role: 'user', content: message });
      messages.value.push({ role: 'ai', content: response.data.reply });
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to send message';
    } finally {
      loading.value = false;
    }
  };

  return { messages, loading, error, sendMessage };
});