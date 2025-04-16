<!-- filepath: /workspaces/student-scheduler-app/client/src/views/AIChatView.vue -->
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-purple-700">AI Chat</h1>
    <div class="bg-white rounded-lg shadow p-4">
      <div class="space-y-4">
        <div v-for="message in messages" :key="message.content" class="p-3 rounded-md" :class="{
          'bg-purple-100 text-gray-900': message.role === 'user',
          'bg-gray-100 text-gray-600': message.role === 'ai'
        }">
          <p>{{ message.content }}</p>
        </div>
      </div>
      <form @submit.prevent="sendMessage" class="mt-4 flex gap-2">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Type your message..."
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button type="submit" class="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-500 transition-colors">
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAIChatStore } from '../store/aiChat';
import { useToastStore } from '../store/toast';

const aiChatStore = useAIChatStore();
const toastStore = useToastStore();

const messages = ref(aiChatStore.messages);
const newMessage = ref('');

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;
  try {
    await aiChatStore.sendMessage(newMessage.value);
    newMessage.value = '';
  } catch (error) {
    toastStore.showToast(error.message || 'Failed to send message', 'error');
  }
};
</script>