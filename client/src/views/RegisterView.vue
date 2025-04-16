<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-purple-700">Create an Account</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block mb-1 text-sm font-medium">Name</label>
          <input
            v-model="name"
            type="text"
            required
            placeholder="Enter your name"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div class="mb-4">
          <label class="block mb-1 text-sm font-medium">Email</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="Enter your email"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div class="mb-6">
          <label class="block mb-1 text-sm font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="Enter your password"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          Register
        </button>
      </form>
      <p class="mt-4 text-sm text-center">
        Already have an account? <router-link to="/login" class="text-purple-600 hover:underline">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../store/user';

const name = ref('');
const email = ref('');
const password = ref('');
const userStore = useUserStore();

const register = async () => {
  try {
    await userStore.register({ name: name.value, email: email.value, password: password.value });
    alert('Registration successful!');
  } catch (error) {
    alert(error.message || 'Registration failed');
  }
};
</script>

<style scoped></style>