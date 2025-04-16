<!-- filepath: /workspaces/student-scheduler-app/client/src/views/AssignmentsView.vue -->
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-purple-700">Assignments</h1>
    <button @click="openAddAssignmentDialog" class="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-500 transition-colors mb-4">
      <span class="material-icons">add</span> Add Assignment
    </button>

    <div v-if="assignments.length" class="overflow-x-auto">
      <table class="w-4/5 mx-auto text-left">
        <thead>
          <tr class="bg-purple-300 text-gray-900">
            <th class="px-4 py-2">Title</th>
            <th class="px-4 py-2">Deadline</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="assignment in assignments" :key="assignment._id" class="hover:bg-purple-50">
            <td class="px-4 py-2">{{ assignment.title }}</td>
            <td class="px-4 py-2">{{ formatDate(assignment.deadline) }}</td>
            <td class="px-4 py-2">{{ assignment.status }}</td>
            <td class="px-4 py-2 flex gap-2">
              <button
                v-if="assignment.status === 'pending'"
                @click="markCompleted(assignment._id)"
                class="text-green-500 hover:text-green-700"
              >
                <span class="material-icons">check_circle</span>
              </button>
              <button @click="deleteAssignment(assignment._id)" class="text-red-500 hover:text-red-700">
                <span class="material-icons">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center text-gray-600 mt-6">
      <p>No assignments available. Add a new assignment to get started.</p>
    </div>

    <!-- Input Dialog -->
    <InputDialog
      v-if="showAddAssignmentDialog"
      :show="showAddAssignmentDialog"
      title="Add New Assignment"
      :fields="[
        { name: 'title', label: 'Assignment Title' },
        { name: 'deadline', label: 'Deadline', type: 'date' }
      ]"
      @close="closeAddAssignmentDialog"
      @submit="addAssignment"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAssignmentsStore } from '../store/assignments';
import { useToastStore } from '../store/toast';
import InputDialog from '../components/InputDialog.vue';

const assignmentsStore = useAssignmentsStore();
const toastStore = useToastStore();

const assignments = ref([]);
const showAddAssignmentDialog = ref(false);

const openAddAssignmentDialog = () => {
  showAddAssignmentDialog.value = true;
};

const closeAddAssignmentDialog = () => {
  showAddAssignmentDialog.value = false;
};

const addAssignment = async (assignmentData) => {
  try {
    await assignmentsStore.addAssignment(assignmentData);
    toastStore.showToast('Assignment added successfully!', 'success');
  } catch (error) {
    toastStore.showToast(error.message || 'Failed to add assignment', 'error');
  }
};

const deleteAssignment = async (id) => {
  try {
    await assignmentsStore.deleteAssignment(id);
    toastStore.showToast('Assignment deleted successfully!', 'success');
  } catch (error) {
    toastStore.showToast(error.message || 'Failed to delete assignment', 'error');
  }
};

const markCompleted = async (id) => {
  try {
    await assignmentsStore.markCompleted(id);
    toastStore.showToast('Assignment marked as completed!', 'success');
  } catch (error) {
    toastStore.showToast(error.message || 'Failed to mark assignment as completed', 'error');
  }
};

const formatDate = (date) => new Date(date).toLocaleDateString();

onMounted(async () => {
  await assignmentsStore.fetchAssignments();
  assignments.value = assignmentsStore.assignments;
});
</script>