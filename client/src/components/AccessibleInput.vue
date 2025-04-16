<template>
  <div class="mb-4">
    <label :for="id" class="block text-sm font-medium mb-2 dark:text-gray-200">
      {{ label }}
    </label>
    <input 
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :aria-describedby="helpTextId"
      class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      :class="{ 'border-red-500': error }"
    >
    <div v-if="helpText" :id="helpTextId" class="text-sm text-gray-500 dark:text-gray-300 mt-1">
      {{ helpText }}
    </div>
    <div v-if="error" class="text-red-500 text-sm mt-1" role="alert">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  label: String,
  type: { type: String, default: 'text' },
  modelValue: [String, Number],
  helpText: String,
  error: String
});

const helpTextId = computed(() => `${props.id}-help`);
</script>