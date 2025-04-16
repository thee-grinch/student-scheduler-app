// 7. EventList.vue
<template>
  <div class="bg-white rounded-lg shadow p-4">
    <h3 class="text-sm font-semibold mb-2">Next Event</h3>
    <div v-for="event in events" :key="event.title" class="mb-3">
      <div class="flex items-center gap-2 text-sm">
        <i class="lucide-calendar text-purple-700"></i>
        <span>{{ event.title }}</span>
      </div>
      <div class="text-xs text-gray-500 ml-6">{{ event.time }} | {{ event.formattedDate}}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({ events: Array });
</script>