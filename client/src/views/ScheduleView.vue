<!-- filepath: /workspaces/student-scheduler-app/client/src/views/ScheduleView.vue -->
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-purple-700">Schedule</h1>
    <div class="flex justify-between items-center mb-4">
      <button
        @click="createTimetable"
        class="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-500 transition-colors"
      >
        Create Timetable
      </button>
    </div>
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div class="grid grid-cols-7 gap-4">
        <div
          v-for="day in scheduleStore.days"
          :key="day.date"
          class="p-4 border rounded-lg cursor-pointer"
          :class="{
            'bg-purple-100 text-purple-700': day.activities.length > 0,
            'bg-gray-100 text-gray-600': day.activities.length === 0
          }"
          @click="openDayDialog(day)"
        >
          <p class="font-bold">{{ day.date }}</p>
          <ul class="mt-2 space-y-1">
            <li
              v-for="activity in day.activities"
              :key="activity.id"
              class="text-sm text-gray-800 dark:text-gray-300"
            >
              {{ activity.title }} ({{ activity.time }})
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Day Activities Dialog -->
    <Modal v-if="selectedDay" :show="true" @close="closeDayDialog">
      <div class="p-6">
        <h2 class="text-lg font-bold mb-4 text-purple-700">Activities on {{ selectedDay.date }}</h2>
        <ul>
          <li class="flex justify-around">
            <p class="font-semibold">Type</p>
            <p class="font-semibold text-center">Title</p>
            <p class="font-semibold">Time</p>
          </li>
          <li
            v-for="activity in selectedDay.activities"
            :key="activity.id"
            class="mb-2 flex justify-around"
            :class="activity.type === 'event'? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'" 
          >
            <p>{{ activity.type }} </p>
            <p class="font-semibold text-center">{{ activity.title }}</p>
            <p class="text-sm text-gray-600">{{ activity.time }}</p>
          </li>
        </ul>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Modal from '../components/Modal.vue';
import { useScheduleStore } from '../store/schedule';
import { useTimetableStore } from '../store/timetable';

const scheduleStore = useScheduleStore();
const timetableStore = useTimetableStore();

const selectedDay = ref(null);

const openDayDialog = (day) => {
  selectedDay.value = day;
};

const closeDayDialog = () => {
  selectedDay.value = null;
};

const createTimetable = async () => {
  try {
    await timetableStore.createTimetable();
    await scheduleStore.generateSchedule(); // Regenerate the schedule after creating the timetable
    alert('Timetable created successfully!');
  } catch (error) {
    alert('Failed to create timetable: ' + error.message);
  }
};

onMounted(async () => {
  await scheduleStore.generateSchedule(); // Generate the schedule on component mount
});
</script>