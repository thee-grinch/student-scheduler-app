import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '../services/api';

export const useCoursesStore = defineStore('courses', () => {
  const courses = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchCourses = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get('/courses');
      courses.value = response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to load courses';
    } finally {
      loading.value = false;
    }
  };

  const addCourse = async (courseData) => {
    try {
      const response = await api.post('/courses', courseData);
      courses.value.push(response.data);
    } catch (err) {
      throw err.response?.data?.message || 'Failed to add course';
    }
  };

  const deleteCourse = async (id) => {
    try {
      await api.delete(`/courses/${id}`);
      courses.value = courses.value.filter(course => course._id !== id);
    } catch (err) {
      throw err.response?.data?.message || 'Failed to delete course';
    }
  };

  const totalCourses = computed(() => courses.value.length)

  return { courses, totalCourses,loading, error, fetchCourses, addCourse, deleteCourse };
});