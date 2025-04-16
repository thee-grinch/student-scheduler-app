<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-semibold dark:text-white">Weekly Schedule</h3>
      <button @click="showAddClass = true" class="btn-primary">Add Class</button>
    </div>

    <div class="grid grid-cols-7 gap-2">
      <div v-for="day in days" :key="day" class="p-2 border rounded dark:border-gray-600">
        <h4 class="font-medium mb-2 dark:text-white">{{ day }}</h4>
        <div v-for="cls in classesByDay(day)" :key="cls._id"
             class="p-2 mb-2 rounded bg-blue-50 dark:bg-gray-700">
          <span class="dark:text-white">{{ cls.subject }}</span>
          <span class="text-sm dark:text-gray-300">{{ cls.time }}</span>
        </div>
      </div>
    </div>

    <Modal :show="showAddClass" @close="showAddClass = false">
      <!-- Add class form -->
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import api from '../services/api';

const props = defineProps(['classes']);
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const showAddClass = ref(false);

const classesByDay = (day) => {
  return props.classes.filter(c => c.day === day);
};
</script>