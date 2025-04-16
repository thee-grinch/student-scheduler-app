<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-purple-700">Courses</h1>
    <button @click="openAddCourseDialog" class="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-500 transition-colors mb-4">
      <span class="material-icons">add</span> Add Course
    </button>

    <div v-if="courses.length" class="overflow-x-auto">
      <table class="w-4/5 mx-auto text-left">
        <thead>
          <tr class="bg-purple-300 text-gray-900">
            <th class="px-4 py-2">Course Name</th>
            <th class="px-4 py-2">Lecturer</th>
            <th class="px-4 py-2">Weight</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in courses" :key="course._id" class="hover:bg-purple-50">
            <td class="px-4 py-2">{{ course.name }}</td>
            <td class="px-4 py-2">{{ course.lecturer }}</td>
            <td class="px-4 py-2">{{ course.weight }}</td>
            <td class="px-4 py-2 flex gap-2">
              <button @click="deleteCourse(course._id)" class="text-red-500 hover:text-red-700">
                <span class="material-icons">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center text-gray-600 mt-6">
      <p>No courses available. Add a new course to get started.</p>
    </div>

    <!-- Input Dialog -->
    <InputDialog
      v-if="showAddCourseDialog"
      :show="showAddCourseDialog"
      title="Add New Course"
      :fields="[
        { name: 'name', label: 'Course Name' },
        { name: 'lecturer', label: 'Lecturer Name' },
        { name: 'weight', label: 'Course Weight', type: 'number' }
      ]"
      @close="closeAddCourseDialog"
      @submit="addCourse"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCoursesStore } from '../store/courses';
import { useToastStore } from '../store/toast';
import InputDialog from '../components/InputDialog.vue';

const coursesStore = useCoursesStore();
const toastStore = useToastStore();

const courses = ref([]);
const showAddCourseDialog = ref(false);

const openAddCourseDialog = () => {
  showAddCourseDialog.value = true;
};

const closeAddCourseDialog = () => {
  showAddCourseDialog.value = false;
};

const addCourse = async (courseData) => {
  try {
    await coursesStore.addCourse(courseData);
    toastStore.showToast('Course added successfully!', 'success');
  } catch (error) {
    toastStore.showToast(error.message || 'Failed to add course', 'error');
  }
};

const deleteCourse = async (id) => {
  try {
    await coursesStore.deleteCourse(id);
    toastStore.showToast('Course deleted successfully!', 'success');
  } catch (error) {
    toastStore.showToast(error.message || 'Failed to delete course', 'error');
  }
};

onMounted(async () => {
  await coursesStore.fetchCourses();
  courses.value = coursesStore.courses;
});
</script>