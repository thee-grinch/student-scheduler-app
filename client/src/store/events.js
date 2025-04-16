import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../services/api';

export const useEventsStore = defineStore('events', () => {
  const events = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Helper function to format dates
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  const fetchEvents = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get('/events');
      console.log('events', response.data);
      // Format the event dates
      events.value = response.data.map((event) => ({
        ...event,
        formattedDate: formatDate(event.date),
      }));
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to load events';
    } finally {
      loading.value = false;
    }
  };

  const addEvent = async (eventData) => {
    try {
      const response = await api.post('/events', eventData);
      // Format the date of the new event
      events.value.push({
        ...response.data,
        formattedDate: formatDate(response.data.date),
      });
    } catch (err) {
      throw err.response?.data?.message || 'Failed to add event';
    }
  };

  const deleteEvent = async (id) => {
    try {
      await api.delete(`/events/${id}`);
      events.value = events.value.filter((event) => event._id !== id);
    } catch (err) {
      throw err.response?.data?.message || 'Failed to delete event';
    }
  };

  return { events, loading, error, fetchEvents, addEvent, deleteEvent };
});