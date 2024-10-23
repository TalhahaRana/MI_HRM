<template>
  <div class="announcement-creation">
    <h2 class="section-title">Create Announcement</h2>

    <div class="announcement-form">
      <!-- Announcement Title -->
      <div class="form-group">
        <label for="title">Announcement Title</label>
        <input type="text" id="title" v-model="announcement.title" placeholder="Enter announcement title"
          class="input-field" />
      </div>

      <!-- Announcement Content (Quill Editor) -->
      <div class="form-group">
        <label for="content">Announcement Content</label>
        <QuillEditor ref="quillEditor" v-model="announcement.content" :options="editorOptions" class="quill-editor"
          @text-change="onTextChange" />
      </div>

      <!-- Publish Options -->
      <div class="form-group">
        <label for="publish">Publish Options</label>
        <select v-model="announcement.publishOption" class="input-field">
          <option value="now">Publish Now</option>
          <option value="schedule">Schedule for Later</option>
        </select>
      </div>

      <!-- Schedule Date (Only if 'Schedule for Later' is selected) -->
      <div class="form-group" v-if="announcement.publishOption === 'schedule'">
        <label for="schedule-date">Schedule Date</label>
        <input type="datetime-local" id="schedule-date" v-model="announcement.scheduleDate" class="input-field" />
      </div>

      <!-- Publish Button -->
      <div class="form-group form-actions">
        <button @click="publishAnnouncement" class="btn-primary">Publish</button>
      </div>
    </div>

    <!-- Announcements Table -->
    <h2 class="section-title">Manage Announcements</h2>
    <div class="announcement-table-wrapper">
      <table class="announcement-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ann in announcements" :key="ann.id">
            <td>{{ ann.title }}</td>
            <!-- Show only a truncated version of the content -->
            <td>{{ truncateContent(ann.text) }}</td>
            <td>{{ ann.enabled ? 'Enabled' : 'Disabled' }}</td>
            <td>
              <button class="btn-action btn-view w-100 mb-2" @click="openModal(ann)">View Details</button>
              <button class="btn-action w-100" @click="toggleAnnouncement(ann)">
                {{ ann.enabled ? 'Disable' : 'Enable' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Custom Modal for Viewing Announcement Details -->
    <div v-if="isModalOpen" class="custom-modal-overlay" @click="closeModal">
      <div class="custom-modal" @click.stop>
        <div class="modal-header">
          <h5>{{ selectedAnnouncement.title }}</h5>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <p><strong>Content:</strong></p>
          <!-- Full content is displayed in the modal -->
          <div v-html="selectedAnnouncement.text"></div>
          <p><strong>Status:</strong> {{ selectedAnnouncement.enabled ? 'Enabled' : 'Disabled' }}</p>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex'; // Import Vuex store
import { QuillEditor } from '@vueup/vue-quill';
import 'quill/dist/quill.snow.css';

const store = useStore(); // Access Vuex store

// Sample Announcements (Remove or replace this with actual data fetching from Vuex store)
const announcements = ref([]);
onMounted(async () => {
  await store.dispatch('admin/fetchAnnouncements'); // Fetch announcements when component mounts
  announcements.value = store.state.admin.announcements; // Store announcements in the local variable
});
// Quill Editor options
const editorOptions = ref({
  theme: 'snow',
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'blockquote', 'code-block'],
    [{ align: [] }],
  ],
});

// Announcement Data
const announcement = ref({
  title: '',
  content: '',
  publishOption: 'now',
  scheduleDate: null,
});

// Modal state and selected announcement for view
const isModalOpen = ref(false);
const selectedAnnouncement = ref({ title: '', content: '', enabled: false });

// Handle text change in Quill editor
const onTextChange = () => {
  const quillEditorInstance = document.querySelector('.quill-editor .ql-editor');
  if (quillEditorInstance) {
    announcement.value.content = quillEditorInstance.innerHTML; // Capture HTML content
  }
};

// Publish Announcement Handler
const publishAnnouncement = async () => {
  if (announcement.value.title && announcement.value.content) {
    const announcementData = {
      title: announcement.value.title,
      text: announcement.value.content,
    };

    // Add schedule date if "Schedule for Later" is selected
    if (announcement.value.publishOption === 'schedule' && announcement.value.scheduleDate) {
      announcementData.published_at = announcement.value.scheduleDate;
    }

    // Dispatch the action to Vuex store to create an announcement
    try {
      await store.dispatch('admin/createAnnouncement', announcementData);
      console.log('Announcement published successfully!');
      resetForm();
    } catch (error) {
      console.error('Error publishing announcement:', error);
    }
  } else {
    alert('Please enter a title and content for the announcement.');
  }
};

// Reset the form after publishing
const resetForm = () => {
  announcement.value.title = '';
  announcement.value.content = '';
  announcement.value.publishOption = 'now';
  announcement.value.scheduleDate = null;

  // Reset the Quill editor
  const quillEditorInstance = document.querySelector('.quill-editor .ql-editor');
  if (quillEditorInstance) {
    quillEditorInstance.innerHTML = '';
  }
};

// Truncate content to show only a limited number of characters
const truncateContent = (content, length = 70) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = content;
  const textContent = tempDiv.textContent || tempDiv.innerText || "";
  return textContent.length > length ? textContent.substring(0, length) + "..." : textContent;
};

// Open Modal for Viewing Announcement Details
const openModal = (ann) => {
  selectedAnnouncement.value = { ...ann };
  isModalOpen.value = true;
};

// Close Modal
const closeModal = () => {
  isModalOpen.value = false;
};

// Toggle Announcement Enable/Disable (This should eventually call the toggle API)
// Toggle Announcement Enable/Disable (This should call the API to update the status)
const toggleAnnouncement = async (ann) => {
  try {
    // Determine the new status (invert the current one)
    const newStatus = !ann.enabled;

    // Call the Vuex store action to update the status
    await store.dispatch('admin/updateAnnouncementStatus', { id: ann.id, is_published: newStatus ? 1 : 0 });

    // Update the local state after a successful API call
    ann.enabled = newStatus;
  } catch (error) {
    console.error('Error updating announcement status:', error);
  }
};
</script>

<style scoped>
/* Styles for the form and table */
.announcement-creation {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.btn-primary {
  background-color: #4b49ac;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

h2.section-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.announcement-table-wrapper {
  max-height: 500px;
  overflow-y: auto;
}

.announcement-table thead th {
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
}

.announcement-table {
  width: 100%;
  margin-top: 30px;
  border-collapse: collapse;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.announcement-table th,
.announcement-table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

.btn-action {
  padding: 6px 12px;
  background-color: #4b49ac;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-action:hover,
.btn-primary:hover {
  background-color: #3e3a95;
}

.btn-view {
  background-color: #28a745;
  margin-right: 10px;
}

/* Modal Styling */
.custom-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.custom-modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.modal-body {
  margin-top: 20px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
