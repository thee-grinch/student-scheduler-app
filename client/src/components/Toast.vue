<template>
  <transition name="slide-fade">
    <div v-if="show" class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white"
         :class="[type === 'success' ? 'bg-green-500' : 'bg-red-500']">
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useToastStore } from '../store/toast.js';

const toastStore = useToastStore();
const show = ref(false);
const message = ref('');
const type = ref('success');

watch(() => toastStore.message, (newVal) => {
  if (newVal) {
    show.value = true;
    message.value = toastStore.message;
    type.value = toastStore.type;
    setTimeout(() => {
      show.value = false;
      toastStore.clearMessage();
    }, 3000);
  }
});
</script>