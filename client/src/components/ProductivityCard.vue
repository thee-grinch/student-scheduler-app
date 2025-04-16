// 4. ProductivityCard.vue
<template>
  <div :class="['p-4 rounded-xl shadow-md w-full', colorClass]">
    <div class="text-sm text-white">{{ label }}</div>
    <div class="flex justify-between items-center mt-2">
      <span class="text-lg text-white font-bold">{{ time }}</span>
      <span class="text-white">{{ percentage }}%</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  time: String,
  percentage: Number,
  colorClass: String
});
</script>