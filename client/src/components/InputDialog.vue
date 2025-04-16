<!-- filepath: /workspaces/student-scheduler-app/client/src/components/InputDialog.vue -->
<template>
  <Modal :show="show" @close="closeDialog">
    <div class="p-6">
      <h3 class="text-lg font-medium mb-4 text-gray-900">{{ title }}</h3>
      <form @submit.prevent="submit">
        <div v-for="(field, index) in fields" :key="index" class="mb-4">
          <label :for="field.name" class="block text-sm font-medium mb-1 text-gray-700">{{ field.label }}</label>
          <input
            v-model="form[field.name]"
            :type="field.type || 'text'"
            :id="field.name"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            required
          />
        </div>
        <div class="flex justify-end gap-3 mt-6">
          <button type="button" @click="closeDialog" class="btn-secondary">Cancel</button>
          <button type="submit" class="btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script setup>
import { ref } from 'vue';
import Modal from './Modal.vue';

const props = defineProps({
  show: { type: Boolean, required: true },
  title: { type: String, required: true },
  fields: { type: Array, required: true },
});

const emit = defineEmits(['close', 'submit']);

const form = ref({});

const closeDialog = () => {
  emit('close');
};

const submit = () => {
  emit('submit', { ...form.value });
  closeDialog();
};
</script>