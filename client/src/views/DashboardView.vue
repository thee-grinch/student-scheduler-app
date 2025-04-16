<template>
  <div class="flex m-auto w-full">
    <div v-if="loading" class="flex justify-center items-center w-full h-screen">
      <div class="animate-spin rounded-full h-20 w-20 border-t-4 border-purple-700 border-solid"></div>
    </div>
    <div class="flex" v-else>
    <div class="flex-1 w-3xl bg-gray-100 p-4">
      <Topbar />
      <div class="grid grid-cols-3 gap-4 mt-4">
        <ProductivityCard
          label="Productive"
          :time="productiveTime"
          :percentage="productivePercentage"
          colorClass="bg-orange-400"
        />
        <ProductivityCard
          label="Focus Time"
          :time="focusTime"
          :percentage="focusPercentage"
          colorClass="bg-purple-700"
        />
        <EventList :events="events" />
      </div>
      <div class="mt-6 overflow-hidden">
        <h2 class="text-md font-semibold mb-2">Today Task</h2>
        <TaskItem
          v-for="task in todayTasks"
          :key="task.id"
          :title="task.title"
          :time="task.time"
          :type="task.type" 
        />
      </div>
    </div>
    <div class="w-72 p-4">
      <ProfileSidebar :user="user" :totalSchedules :pendingAssignments :completedAssignments :totalCourses />
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAssignmentsStore } from '../store/assignments';
import { useEventsStore } from '../store/events';
import { useTaskStore } from '../store/task';
import { useUserStore } from '../store/user';
import { useScheduleStore } from '../store/schedule';
import { useCoursesStore } from '../store/courses'

import Topbar from '../components/Topbar.vue';
import ProductivityCard from '../components/ProductivityCard.vue';
import EventList from '../components/EventList.vue';
import TaskItem from '../components/TaskItem.vue';
import ProfileSidebar from '../components/ProfileSidebar.vue';

const assignmentStore = useAssignmentsStore()
const eventsStore = useEventsStore();
const taskStore = useTaskStore();
const userStore = useUserStore();
const scheduleStore = useScheduleStore();
const coursesStore = useCoursesStore();

const loading = ref(true); // Loading state
// Fetch data from stores
onMounted(async () => {
  try {
    await Promise.all([
      eventsStore.fetchEvents(),
      taskStore.fetchTasks(),
      userStore.fetchProfile(),
      scheduleStore.generateSchedule(),
      assignmentStore.fetchAssignments(),
      coursesStore.fetchCourses(),
    ]);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false; // Set loading to false once data is fetched
  }
});

// Computed properties for dynamic data
const events = computed(() => eventsStore.events.slice(0, 3));
const todayTasks = computed(() => scheduleStore.todaysActivities.slice(0, 3));
const totalSchedules = computed(() => scheduleStore.todaysActivities.length);
const user = computed(() => userStore.user);
const pendingAssignments = computed(() => assignmentStore.pendingAssignments);
const completedAssignments = computed(() => assignmentStore.completedAssignments)
const totalCourses = computed(() => coursesStore.totalCourses)

console.log(user)

// Example productivity data (replace with actual logic if available)
const productiveTime = ref('6h 20m');
const productivePercentage = ref(83);
const focusTime = ref('5h 52m');
const focusPercentage = ref(91);
</script>
