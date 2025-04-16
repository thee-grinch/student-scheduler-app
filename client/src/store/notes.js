import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../services/api';

export const useNotesStore = defineStore('notes', () => {
  const notes = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchNotes = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get('/notes');
      notes.value = response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to load notes';
    } finally {
      loading.value = false;
    }
  };

  const uploadNote = async (noteData) => {
    try {
      const response = await api.post('/notes', noteData);
      notes.value.push(response.data);
    } catch (err) {
      throw err.response?.data?.message || 'Failed to upload note';
    }
  };

  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      notes.value = notes.value.filter(note => note._id !== id);
    } catch (err) {
      throw err.response?.data?.message || 'Failed to delete note';
    }
  };

  return { notes, loading, error, fetchNotes, uploadNote, deleteNote };
});