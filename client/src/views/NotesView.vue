<!-- filepath: /workspaces/student-scheduler-app/client/src/views/NotesView.vue -->
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-purple-700">Notes</h1>
    <button @click="uploadNote" class="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-500 transition-colors mb-4">
      <span class="material-icons">upload</span> Upload Note
    </button>

    <div v-if="notes.length" class="overflow-x-auto">
      <table class="w-4/5 mx-auto text-left">
        <thead>
          <tr class="bg-purple-300 text-gray-900">
            <th class="px-4 py-2">Title</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="note in notes" :key="note._id" class="hover:bg-purple-50">
            <td class="px-4 py-2">{{ note.title }}</td>
            <td class="px-4 py-2 flex gap-2">
              <button @click="downloadNote(note._id)" class="text-blue-500 hover:text-blue-700">
                <span class="material-icons">download</span>
              </button>
              <button @click="deleteNote(note._id)" class="text-red-500 hover:text-red-700">
                <span class="material-icons">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center text-gray-600 mt-6">
      <p>No notes available. Upload a new note to get started.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNotesStore } from '../store/notes';
import { useToastStore } from '../store/toast';

const notesStore = useNotesStore();
const toastStore = useToastStore();

const notes = ref([]);

const uploadNote = () => {
  alert('Upload functionality coming soon!');
};

const downloadNote = (id) => {
  alert(`Downloading note with ID: ${id}`);
};

const deleteNote = async (id) => {
  try {
    await notesStore.deleteNote(id);
    toastStore.showToast('Note deleted successfully!', 'success');
  } catch (error) {
    toastStore.showToast(error.message || 'Failed to delete note', 'error');
  }
};

onMounted(async () => {
  await notesStore.fetchNotes();
  notes.value = notesStore.notes;
});
</script>