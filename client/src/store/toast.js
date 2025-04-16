import { defineStore } from 'pinia';

export const useToastStore = defineStore('toast', {
  state: () => ({
    message: '',
    type: 'success', // 'success' or 'error'
  }),
  actions: {
    showToast(message, type = 'success') {
      this.message = message;
      this.type = type;
    },
    clearMessage() {
      this.message = '';
    },
  },
});