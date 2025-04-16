<script setup>
import Toast from './components/Toast.vue';
</script>
<template>
  <div class="p-auto m-auto">
    <router-view />
    <Toast />
  </div>
</template>