<template>
  <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold dark:text-white">Tasks</h3>
      <button @click="openModal" class="btn-primary">Add Task</button>
    </div>

    <div class="space-y-2">
      <div v-for="task in tasks" :key="task._id" 
           class="p-3 rounded-lg border dark:border-gray-600 flex items-center justify-between">
        <div>
          <h4 class="font-medium dark:text-white">{{ task.title }}</h4>
          <p class="text-sm text-gray-500 dark:text-gray-300">
            Due: {{ formatDate(task.dueDate) }}
          </p>
        </div>
        <div class="flex gap-2">
          <button @click="editTask(task)" class="btn-icon">
            <PencilIcon class="w-5 h-5" />
          </button>
          <button @click="deleteTask(task._id)" class="btn-icon text-red-500">
            <TrashIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <TaskModal v-if="showModal" :task="selectedTask" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../store/task.js';
import TaskModal from './TaskModal.vue';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';

// Implement task CRUD operations
</script>