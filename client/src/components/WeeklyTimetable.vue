<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-semibold dark:text-white">Weekly Schedule</h3>
      <button 
        @click="openModal"
        class="btn-primary flex items-center gap-2"
      >
        <PlusIcon class="w-5 h-5" />
        Add Class
      </button>
    </div>

    <!-- Weekly Grid -->
    <div class="overflow-x-auto">
      <div class="grid grid-cols-7 min-w-[800px] gap-2">
        <div 
          v-for="day in days" 
          :key="day" 
          class="p-2 border rounded dark:border-gray-600"
        >
          <h4 class="font-medium mb-2 dark:text-white">{{ day }}</h4>
          <draggable 
            :list="getClassesByDay(day)" 
            group="classes"
            @end="onDragEnd"
            item-key="_id"
            class="min-h-[100px]"
          >
            <template #item="{ element }">
              <div 
                class="p-2 mb-2 rounded bg-blue-50 dark:bg-gray-700 cursor-move"
                @click="openEditModal(element)"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <h5 class="font-medium dark:text-white">{{ element.subject }}</h5>
                    <p class="text-sm text-gray-600 dark:text-gray-300">
                      {{ formatTime(element.startTime) }} - {{ formatTime(element.endTime) }}
                    </p>
                    <p v-if="element.location" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {{ element.location }}
                    </p>
                  </div>
                  <button 
                    @click.stop="deleteClass(element._id)"
                    class="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <Modal :show="showModal" @close="closeModal">
      <div class="p-6">
        <h3 class="text-lg font-medium mb-4 dark:text-white">
          {{ editingClass ? 'Edit Class' : 'Add New Class' }}
        </h3>
        
        <form @submit.prevent="saveClass">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1 dark:text-gray-200">Subject</label>
              <input
                v-model="form.subject"
                required
                class="input-field"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1 dark:text-gray-200">Day</label>
                <select v-model="form.day" class="input-field">
                  <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium mb-1 dark:text-gray-200">Location</label>
                <input v-model="form.location" class="input-field" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1 dark:text-gray-200">Start Time</label>
                <input
                  v-model="form.startTime"
                  type="time"
                  required
                  class="input-field"
                  :min="minTime"
                  :max="form.endTime"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-1 dark:text-gray-200">End Time</label>
                <input
                  v-model="form.endTime"
                  type="time"
                  required
                  class="input-field"
                  :min="form.startTime"
                />
              </div>
            </div>

            <div class="flex justify-end gap-3 mt-6">
              <button type="button" @click="closeModal" class="btn-secondary">
                Cancel
              </button>
              <button type="submit" class="btn-primary">
                {{ editingClass ? 'Update' : 'Save' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { PlusIcon, TrashIcon } from '@heroicons/vue/24/outline';
import draggable from 'vuedraggable';
import { useTimetableStore } from '../store/timetable';
import Modal from './Modal.vue';
import { convertToMinutes, formatTime } from '../utils/timeUtils';

const days = [
  'Monday', 'Tuesday', 'Wednesday', 
  'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const timetableStore = useTimetableStore();
const showModal = ref(false);
const editingClass = ref(null);
const currentDragDay = ref(null);

const form = ref({
  subject: '',
  day: 'Monday',
  startTime: '09:00',
  endTime: '10:00',
  location: ''
});

// Fetch timetable on mount
onMounted(async () => {
  await timetableStore.fetchTimetable();
});

const getClassesByDay = (day) => {
  return timetableStore.timetable
    .filter(c => c.day === day)
    .sort((a, b) => convertToMinutes(a.startTime) - convertToMinutes(b.startTime));
};

const openModal = () => {
  showModal.value = true;
};

const openEditModal = (cls) => {
  editingClass.value = cls._id;
  form.value = { ...cls };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingClass.value = null;
  resetForm();
};

const resetForm = () => {
  form.value = {
    subject: '',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    location: ''
  };
};

const saveClass = async () => {
  try {
    const classData = {
      ...form.value,
      startTime: form.value.startTime.slice(0, 5),
      endTime: form.value.endTime.slice(0, 5)
    };

    if (editingClass.value) {
      await timetableStore.updateClass(editingClass.value, classData);
    } else {
      await timetableStore.addClass(classData);
    }
    
    closeModal();
  } catch (error) {
    console.error('Error saving class:', error);
  }
};

const deleteClass = async (id) => {
  if (confirm('Are you sure you want to delete this class?')) {
    await timetableStore.deleteClass(id);
  }
};

const onDragEnd = async (evt) => {
  const movedClass = timetableStore.timetable.find(c => c._id === evt.item.element._id);
  if (movedClass) {
    const newDay = days[Math.floor(evt.newIndex / (timetableStore.timetable.length / 7))];
    await timetableStore.updateClass(movedClass._id, { day: newDay });
  }
};

const minTime = computed(() => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
});
</script>

<style scoped>
  @reference "tailwindcss";
.input-field {
  @apply w-full px-2 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors;
}

.btn-secondary {
  @apply px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors;
}
</style>