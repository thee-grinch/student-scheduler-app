<!-- filepath: /workspaces/student-scheduler-app/client/src/views/LandingPage.vue -->
<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Navigation -->
    <header class="bg-white shadow">
      <div class="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-purple-700">Student Scheduler</h1>
        <nav class="flex space-x-6">
          <router-link to="/login" class="text-gray-700 hover:text-purple-700">Login</router-link>
          <router-link to="/register" class="text-gray-700 hover:text-purple-700">Register</router-link>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="bg-purple-700 text-white py-20">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold mb-4">Organize Your Student Life</h2>
        <p class="text-lg mb-6">Plan your tasks, manage your schedule, and stay productive with ease.</p>
        <router-link
          to="/register"
          class="bg-white text-purple-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </router-link>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16">
      <div class="container mx-auto px-6">
        <h3 class="text-3xl font-bold text-center text-gray-800 mb-12">Features</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white shadow rounded-lg p-6 text-center">
            <div class="text-purple-700 text-4xl mb-4">
              <span class="material-icons">schedule</span>
            </div>
            <h4 class="text-xl font-semibold mb-2">Timetable Management</h4>
            <p class="text-gray-600">Easily create and manage your class schedules and events.</p>
          </div>
          <div class="bg-white shadow rounded-lg p-6 text-center">
            <div class="text-purple-700 text-4xl mb-4">
              <span class="material-icons">task</span>
            </div>
            <h4 class="text-xl font-semibold mb-2">Task Tracking</h4>
            <p class="text-gray-600">Keep track of your assignments and deadlines effortlessly.</p>
          </div>
          <div class="bg-white shadow rounded-lg p-6 text-center">
            <div class="text-purple-700 text-4xl mb-4">
              <span class="material-icons">chat</span>
            </div>
            <h4 class="text-xl font-semibold mb-2">AI Chat Assistant</h4>
            <p class="text-gray-600">Get help and guidance with our AI-powered chatbot.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="bg-gray-100 py-16">
      <div class="container mx-auto px-6">
        <h3 class="text-3xl font-bold text-center text-gray-800 mb-12">What Our Users Say</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white shadow rounded-lg p-6">
            <p class="text-gray-600 italic mb-4">
              "This app has completely transformed how I manage my time as a student!"
            </p>
            <h4 class="text-lg font-semibold text-gray-800">- Jane Doe</h4>
          </div>
          <div class="bg-white shadow rounded-lg p-6">
            <p class="text-gray-600 italic mb-4">
              "The AI assistant is a game-changer. Highly recommend it!"
            </p>
            <h4 class="text-lg font-semibold text-gray-800">- John Smith</h4>
          </div>
          <div class="bg-white shadow rounded-lg p-6">
            <p class="text-gray-600 italic mb-4">
              "I love how easy it is to create and manage my schedule with this app."
            </p>
            <h4 class="text-lg font-semibold text-gray-800">- Sarah Lee</h4>
          </div>
        </div>
      </div>
    </section>

    <!-- Call-to-Action Section -->
    <section class="bg-purple-700 text-white py-16">
      <div class="container mx-auto px-6 text-center">
        <h3 class="text-3xl font-bold mb-4">Ready to Get Started?</h3>
        <p class="text-lg mb-6">Sign up today and take control of your student life.</p>
        <router-link
          to="/register"
          class="bg-white text-purple-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          Sign Up Now
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-6">
      <div class="container mx-auto px-6 text-center">
        <p>&copy; 2025 Student Scheduler. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
</script>

<style>
/* Add any additional custom styles here */
</style>