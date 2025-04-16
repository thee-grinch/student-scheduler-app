<template>
    <transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
        <!-- Backdrop -->
        <div 
          class="fixed inset-0 bg-black/50 transition-opacity"
          @click.self="$emit('close')"
        ></div>
  
        <!-- Modal Container -->
        <div class="flex min-h-full items-center justify-center p-4">
          <transition name="modal-content">
            <div 
              class="relative w-full max-w-md rounded-lg bg-white dark:bg-gray-800 shadow-xl transition-all"
              role="dialog"
              aria-modal="true"
            >
              <!-- Close Button -->
              <button 
                @click="$emit('close')"
                class="absolute top-4 right-4 p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
                aria-label="Close"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
  
              <!-- Content Slot -->
              <div class="p-6">
                <slot></slot>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { onMounted, onBeforeUnmount } from 'vue';
  
  const props = defineProps({
    show: {
      type: Boolean,
      required: true
    }
  });
  
  const emit = defineEmits(['close']);
  
  const handleEscape = (e) => {
    if (e.key === 'Escape' && props.show) {
      emit('close');
    }
  };
  
  onMounted(() => {
    document.addEventListener('keydown', handleEscape);
  });
  
  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleEscape);
  });
  </script>
  
  <style scoped>
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }
  
  .modal-content-enter-active,
  .modal-content-leave-active {
    transition: all 0.3s ease;
  }
  
  .modal-content-enter-from,
  .modal-content-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
  </style>