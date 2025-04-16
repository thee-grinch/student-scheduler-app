<!-- filepath: /workspaces/student-scheduler-app/client/src/views/EventsView.vue -->
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-purple-700">Events</h1>
    <button @click="openAddEventDialog" class="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-500 transition-colors mb-4">
      <span class="material-icons">add</span> Add Event
    </button>

    <div v-if="events.length" class="overflow-x-auto">
      <table class="w-4/5 mx-auto text-left">
        <thead>
          <tr class="bg-purple-300 text-gray-900">
            <th class="px-4 py-2">Title</th>
            <th class="px-4 py-2">Date</th>
            <th class="px-4 py-2">Time</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event._id" class="hover:bg-purple-50">
            <td class="px-4 py-2">{{ event.title }}</td>
            <td class="px-4 py-2">{{ formatDate(event.date) }}</td>
            <td class="px-4 py-2">{{ event.time }}</td>
            <td class="px-4 py-2 flex gap-2">
              <button @click="deleteEvent(event._id)" class="text-red-500 hover:text-red-700">
                <span class="material-icons">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center text-gray-600 mt-6">
      <p>No events available. Add a new event to get started.</p>
    </div>

    <!-- Input Dialog -->
    <InputDialog
      v-if="showAddEventDialog"
      :show="showAddEventDialog"
      title="Add New Event"
      :fields="[
        { name: 'title', label: 'Event Title' },
        { name: 'date', label: 'Event Date', type: 'date' },
        { name: 'time', label: 'Event Time', type: 'time' }
      ]"
      @close="closeAddEventDialog"
      @submit="addEvent"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useEventsStore } from '../store/events';
import { useToastStore } from '../store/toast';
import InputDialog from '../components/InputDialog.vue';

const eventsStore = useEventsStore();
const toastStore = useToastStore();

const events = ref([]);
const showAddEventDialog = ref(false);

const openAddEventDialog = () => {
  showAddEventDialog.value = true;
};

const closeAddEventDialog = () => {
  showAddEventDialog.value = false;
};

const addEvent = async (eventData) => {
  try {
    await eventsStore.addEvent(eventData);
    toastStore.showToast('Event added successfully!', 'success');
  } catch (error) {
    toastStore.showToast(error.message || 'Failed to add event', 'error');
  }
};

const deleteEvent = async (id) => {
  try {
    await eventsStore.deleteEvent(id);
    toastStore.showToast('Event deleted successfully!', 'success');
  } catch (error) {
    toastStore.showToast(error.message || 'Failed to delete event', 'error');
  }
};

const formatDate = (date) => new Date(date).toLocaleDateString();

onMounted(async () => {
  await eventsStore.fetchEvents();
  events.value = eventsStore.events;
});
</script>