<!-- filepath: /workspaces/student-scheduler-app/client/src/views/TimetableView.vue -->
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 dark:text-white">Timetable</h1>
    <WeeklyTimetable :classes="timetableStore.timetable" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useTimetableStore } from '../store/timetable.js';
import WeeklyTimetable from '../components/WeeklyTimetable.vue';

const timetableStore = useTimetableStore();

onMounted(async () => {
  await timetableStore.fetchTimetable();
});
</script>