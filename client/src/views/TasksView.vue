<!-- filepath: /workspaces/student-scheduler-app/client/src/views/TasksView.vue -->
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 dark:text-white">Tasks</h1>
    <TaskList :tasks="tasksStore.tasks" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useTasksStore } from '../store/tasks.js';
import TaskList from '../components/TaskList.vue';

const tasksStore = useTasksStore();

onMounted(async () => {
  await tasksStore.fetchTasks();
});
</script>