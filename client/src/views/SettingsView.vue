<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-purple-700">Settings</h1>
    <div class="bg-white flex dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
      <h2 class="text-lg font-semibold mb-4 ">Study Hours</h2>
      <div v-for="day in days" :key="day" class="flex items-center mb-3">
        <label class="w-24 ">{{ day }}</label>
        <input v-model="studyHours[day.toLowerCase()]" type="number"
               class="ml-2 px-2 py-1 border rounded w-20   ">
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
      <h2 class="text-lg font-semibold mb-4 ">Preferences</h2>
      <div class="flex items-center mb-3">
        <input type="checkbox" v-model="darkMode" class="mr-2">
        <span class="">Dark Mode</span>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 class="text-lg font-semibold mb-4 ">Profile</h2>
      <form @submit.prevent="updateProfile" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="user.name"
            type="text"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="user.email"
            type="email"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button type="submit" class="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-500 transition-colors">
          Save Changes
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '../store/user';
import { useToastStore } from '../store/toast';
import api from '../services/api';

const userStore = useUserStore();
const toastStore = useToastStore();

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const user = computed(() => userStore.user);
const studyHours = ref({});
const darkMode = ref(false);

const saveSettings = async () => {
  try {
    await api.put('/settings', {
      studyHours: studyHours.value,
      darkMode: darkMode.value
    });
    userStore.updateSettings({ studyHours: studyHours.value, darkMode: darkMode.value });
  } catch (error) {
    alert('Failed to save settings');
  }
};

const updateProfile = async () => {
  try {
    await userStore.updateUser(user.value);
    toastStore.showToast('Profile updated successfully!', 'success');
  } catch (error) {
    toastStore.showToast(error.message || 'Failed to update profile', 'error');
  }
};

onMounted(async () => {
  await userStore.fetchUser();
  if (userStore.user && userStore.user.settings) {
    studyHours.value = { ...userStore.user.settings.studyHours };
    darkMode.value = userStore.darkMode;
  }
});
</script>