<!-- filepath: /workspaces/student-scheduler-app/client/src/components/TaskModal.vue -->
<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
      <!-- Modal Header -->
      <div class="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <h3 class="text-lg font-semibold dark:text-white">
          {{ task ? 'Edit Task' : 'Add Task' }}
        </h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
          &times;
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-4">
        <form @submit.prevent="handleSubmit">
          <!-- Task Title -->
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium mb-2 dark:text-gray-200">Title</label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              required
              placeholder="Enter task title"
              class="input-field"
            />
          </div>

          <!-- Due Date -->
          <div class="mb-4">
            <label for="dueDate" class="block text-sm font-medium mb-2 dark:text-gray-200">Due Date</label>
            <input
              id="dueDate"
              v-model="form.dueDate"
              type="date"
              required
              class="input-field"
            />
          </div>

          <!-- Priority -->
          <div class="mb-4">
            <label for="priority" class="block text-sm font-medium mb-2 dark:text-gray-200">Priority</label>
            <select
              id="priority"
              v-model="form.priority"
              class="input-field"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <!-- Modal Footer -->
          <div class="flex justify-end gap-3">
            <button type="button" @click="$emit('close')" class="btn-secondary">Cancel</button>
            <button type="submit" class="btn-primary">{{ task ? 'Save Changes' : 'Add Task' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useTaskStore } from '../store/task.js';

const props = defineProps({
  show: { type: Boolean, required: true },
  task: { type: Object, default: null },
});

const emit = defineEmits(['close', 'save']);

const taskStore = useTaskStore();

const form = ref({
  title: '',
  dueDate: '',
  priority: 'medium',
});

// Watch for changes in the `task` prop and populate the form
watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      form.value = { ...newTask };
    } else {
      form.value = { title: '', dueDate: '', priority: 'medium' };
    }
  },
  { immediate: true }
);

// Handle form submission
const handleSubmit = async () => {
  try {
    if (props.task) {
      // Edit existing task
      await taskStore.updateTask(props.task._id, form.value);
    } else {
      // Add new task
      await taskStore.addTask(form.value);
    }
    emit('save'); // Notify parent component to refresh the task list
    emit('close'); // Close the modal
  } catch (error) {
    console.error('Error saving task:', error);
  }
};
</script>

<style scoped>
@reference 'tailwindcss'
.input-field {
  @apply w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none;
}

.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors;
}

.btn-secondary {
  @apply px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors;
}
</style>