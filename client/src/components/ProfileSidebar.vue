<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <!-- User Info Section -->
    <div class="flex flex-col items-center">
      <div class="w-16 h-16 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold text-2xl">
        {{ user.name.charAt(0).toUpperCase() }}
      </div>
      <div class="text-lg font-semibold mt-2">{{ user.name }}</div>
      <div class="text-sm text-gray-500">{{ user.role }}</div>
      <div class="text-sm text-gray-500">{{ user.email }}</div>
    </div>

    <!-- Statistics Section -->
    <div class="mt-6">
      <h3 class="text-md font-semibold text-gray-700 mb-4">Today's Statistics</h3>
      <div class="space-y-4">
        <!-- Total Schedules -->
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Total Schedules</span>
          <span class="text-sm font-semibold text-purple-700">{{ totalSchedules }}</span>
        </div>
        <!-- Total Assignments -->
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Assignments (Pending)</span>
          <span class="text-sm font-semibold text-orange-500">{{ pendingAssignments }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Assignments (Completed)</span>
          <span class="text-sm font-semibold text-green-500">{{ completedAssignments }}</span>
        </div>
        <!-- Total Subjects -->
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Total Subjects</span>
          <span class="text-sm font-semibold text-blue-500">{{ totalCourses }}</span>
        </div>
      </div>
    </div>

    <!-- Working Hours Section -->
    <div class="mt-6">
      <h3 class="text-md font-semibold text-gray-700 mb-4">Working Hours</h3>
      <div class="flex justify-between">
        <span class="text-sm text-gray-600">Start</span>
        <span class="text-sm font-semibold text-gray-800">09:00 AM</span>
      </div>
      <div class="flex justify-between mt-2">
        <span class="text-sm text-gray-600">End</span>
        <span class="text-sm font-semibold text-gray-800">05:00 PM</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
defineProps({
  user: Object,
  totalSchedules: Number,
  pendingAssignments: Number,
  completedAssignments: Number,
  totalCourses: Number,
});
</script>
