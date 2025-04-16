import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '../services/api';

export const useAssignmentsStore = defineStore('assignments', () => {
  const assignments = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchAssignments = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get('/assignments');
      assignments.value = response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to load assignments';
    } finally {
      loading.value = false;
    }
  };

  const addAssignment = async (assignmentData) => {
    try {
      const response = await api.post('/assignments', assignmentData);
      assignments.value.push(response.data);
    } catch (err) {
      throw err.response?.data?.message || 'Failed to add assignment';
    }
  };

  const markCompleted = async (id) => {
    try {
      const response = await api.put(`/assignments/${id}`);
      const index = assignments.value.findIndex((a) => a._id === id);
      if (index !== -1) {
        assignments.value[index] = response.data;
      }
    } catch (err) {
      throw err.response?.data?.message || 'Failed to mark assignment as completed';
    }
  };

  const deleteAssignment = async (id) => {
    try {
      await api.delete(`/assignments/${id}`);
      assignments.value = assignments.value.filter((a) => a._id !== id);
    } catch (err) {
      throw err.response?.data?.message || 'Failed to delete assignment';
    }
  };

  // Computed properties for completed and pending assignments
  const completedAssignments = computed(() =>
    assignments.value.filter((assignment) => assignment.completed).length
  );

  const pendingAssignments = computed(() =>
    assignments.value.filter((assignment) => !assignment.completed).length
  );

  return {
    assignments,
    loading,
    error,
    fetchAssignments,
    addAssignment,
    markCompleted,
    deleteAssignment,
    completedAssignments,
    pendingAssignments,
  };
});