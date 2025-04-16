
// 2. SidebarItem.vue
<template>
  <div
    :class="[ 'flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all font-medium',
      active ? 'bg-purple-700 text-white' : 'text-gray-700 hover:bg-purple-100']"
  >
    <i :class="`lucide-${item.icon} w-5 h-5 mr-3`"></i>
    {{ item.label }}
  </div>
</template>

<script setup>
defineProps({ item: Object, active: Boolean });
</script>
