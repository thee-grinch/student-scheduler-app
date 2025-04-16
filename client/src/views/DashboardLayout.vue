<script setup>
import Sidebar from '../components/Sidebar.vue';
</script>
<template>
 <div class="flex bg-gray-100 p-4">
    <Sidebar />
    <router-view />
 </div>

</template>