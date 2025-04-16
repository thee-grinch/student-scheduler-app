// 5. TaskItem.vue
<template>
  <div class=" rounded-xl shadow flex justify-center items-center bg-white mb-2">
    <div class="p-2 rounded-xl flex justify-between items-center">
      <div class="text-sm px-4  font-lg">{{ title }}</div>
      <div class="text-sm px-4 font-lg">{{ type }}</div>
      <div class="text-xs px-4  text-gray-500">{{ time }}</div>
    </div>
    
  </div>
</template>

<script setup>
defineProps({ title: String, time: String, type: String,  });
</script>