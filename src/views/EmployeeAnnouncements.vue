<template>
    <div class="dropdown">
      <ul>
        <li v-for="(announcement) in announcements" :key="announcement.id">
            <p>{{ announcement.user_name }}</p>
            <h4>{{ announcement.title }}</h4> <!-- Displaying the title -->
          <p>{{ announcement.text }}</p> <!-- Displaying the text -->
          <small>Published at: {{ announcement.published_at }}</small> <!-- Optional: Show published date -->
        </li>
      </ul>
    </div>
  </template>

  <script>
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';

  export default {
    name: "AnnouncementComponent",
    setup() {
      const store = useStore(); // Access the Vuex store

      // Access announcements from the employee module
      const announcements = computed(() => store.state.employee.announcements);

      // Fetch announcements when the component is mounted
      onMounted(() => {
        store.dispatch('employee/fetchAnnouncements');
      });

      return {
        announcements
      };
    }
  };
  </script>

  <style scoped>
  .dropdown {
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 200px;
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
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid #f0f0f0; /* Optional: Add a separator */
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
  </style>
