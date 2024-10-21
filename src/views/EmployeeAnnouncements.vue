<!-- <template>
  <div class="dropdown">
    <ul>
      <li
        v-for="(announcement) in announcements"
        :key="announcement.id"
        :class="{ unread: !announcement.is_read, read: announcement.is_read }"
        @click="openAnnouncement(announcement)"
      >
        <p>{{ announcement.user_name }}</p>
        <h4>{{ announcement.title }}</h4>
        <span v-html="getTruncatedDescription(announcement)"></span>
        <span><strong>Published at: </strong> {{ announcement.published_at }}</span>


        <span v-if="announcement.is_read" class="read-status">Read</span>
        <span v-else class="unread-status">Unread</span>
      </li>
    </ul>


    <div v-if="selectedAnnouncement" class="modal fade show" tabindex="-1" role="dialog" style="display: block;" @click.self="closeModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedAnnouncement.title }}</h5>
          </div>
          <div class="modal-body">
            <p v-html="selectedAnnouncement.text"></p>
            <small class="text-muted">Published at: {{ selectedAnnouncement.published_at }}</small>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "EmployeeAnnouncements",
  setup() {
    const store = useStore();
    const selectedAnnouncement = ref(null); // For modal display

    // Access announcements from Vuex store
    const announcements = computed(() => store.state.employee.announcements);

    // Fetch announcements from backend
    onMounted(() => {
      store.dispatch("employee/fetchAnnouncements");
    });

    // Mark as read and open the modal
    const openAnnouncement = (announcement) => {
      selectedAnnouncement.value = announcement;

      if (!announcement.is_read) {
        store.dispatch("employee/markAsRead", announcement.id); // No API call, just update the state
      }
    };

    // Function to get truncated description
    const getTruncatedDescription = (announcement) => {
      const description = announcement.text; // Assuming 'text' contains HTML
      const words = description.replace(/<[^>]+>/g, '').split(' '); // Remove HTML tags and split into words

      // If the announcement is read, return a truncated version
      if (announcement.is_read) {
        return words.length > 5 ? words.slice(0, 5).join(' ') + '...' : description;
      }

      // If the announcement is unread, show only the first 5 words with ellipsis
      return words.length > 5 ? words.slice(0, 5).join(' ') + '...' : description; // Unread also shows first 5 words
    };

    // Close modal
    const closeModal = () => {
      selectedAnnouncement.value = null;
    };

    return {
      announcements,
      openAnnouncement,
      getTruncatedDescription,
      selectedAnnouncement,
      closeModal,
    };
  },
};
</script> -->

<template>
  <div class="dropdown rounded">
    <ul>
      <li
        v-for="(announcement) in sortedAnnouncements"
        :key="announcement.id"
        :class="{ unread: !announcement.is_read, read: announcement.is_read }"
        @click="openAnnouncement(announcement)"
      >
        <p>{{ announcement.user_name }}</p>
        <h4>{{ announcement.title }}</h4>
        <span v-html="getTruncatedDescription(announcement)"></span> <!-- Render HTML -->
        <span><strong>Published at: </strong> {{ announcement.published_at }}</span>

        <!-- Show read/unread status -->
        <span v-if="announcement.is_read" class="read-status">Read</span>
        <span v-else class="unread-status">Unread</span>
      </li>
    </ul>

    <!-- Modal for full announcement -->
    <div v-if="selectedAnnouncement" class="modal fade show" tabindex="-1" role="dialog" style="display: block;" @click.self="closeModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedAnnouncement.title }}</h5>
          </div>
          <div class="modal-body">
            <p v-html="selectedAnnouncement.text"></p> <!-- Render full HTML in modal -->
            <small class="text-muted">Published at: {{ selectedAnnouncement.published_at }}</small>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "EmployeeAnnouncements",
  setup() {
    const store = useStore();
    const selectedAnnouncement = ref(null); // For modal display

    // Access announcements from Vuex store and sort by published date (newest first)
    const sortedAnnouncements = computed(() => {
      return store.state.employee.announcements.slice().sort((a, b) => {
        return new Date(b.published_at) - new Date(a.published_at); // Sort in descending order
      });
    });

    // Fetch announcements from backend
    onMounted(() => {
      store.dispatch("employee/fetchAnnouncements");
    });

    // Mark as read and open the modal
    const openAnnouncement = (announcement) => {
      selectedAnnouncement.value = announcement;

      if (!announcement.is_read) {
        store.dispatch("employee/markAsRead", announcement.id); // No API call, just update the state
      }
    };

    // Function to get truncated description
    const getTruncatedDescription = (announcement) => {
      const description = announcement.text; // Assuming 'text' contains HTML
      const words = description.replace(/<[^>]+>/g, '').split(' '); // Remove HTML tags and split into words

      // If the announcement is read, return a truncated version
      if (announcement.is_read) {
        return words.length > 5 ? words.slice(0, 5).join(' ') + '...' : description;
      }

      // If the announcement is unread, show only the first 5 words with ellipsis
      return words.length > 5 ? words.slice(0, 5).join(' ') + '...' : description; // Unread also shows first 5 words
    };

    // Close modal
    const closeModal = () => {
      selectedAnnouncement.value = null;
    };

    return {
      sortedAnnouncements, // Use sorted announcements instead of original announcements
      openAnnouncement,
      getTruncatedDescription,
      selectedAnnouncement,
      closeModal,
    };
  },
};
</script>

  <style scoped>
  .dropdown {
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 250px;
    top: 50px;
    right: 20px;
    position: absolute;
    z-index: 1000;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

  }

  li {
    padding: 10px 10px 20px 10px;
    cursor: pointer;
    border-bottom: 1px solid #cfcfcf;

  }

  li:last-child {
    border-bottom: none; /* Remove the last border */
  }

  h4 {
    margin: 0; /* Remove default margin */
  }

  p {
    margin: 5px 0; /* Add some spacing */
  }

  small {
    color: #999; /* Optional: Style for the published date */
  }


.unread {
  background-color: #ffe4e1; /* Light red background for unread */
}

.read {
  background-color: #f5f5f5; /* Light gray background for read */
}

.read-status {
  color: green;
  font-weight: bold;
}

.unread-status {
  color: red;
  font-weight: bold;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
}
</style>
