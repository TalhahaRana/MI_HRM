<template>
    <div>
      <AdminDashCard v-if="userRole === 'admin'" />
      <HrDashCard v-if="userRole === 'hr'" />
      <EmpDashCard v-if="userRole === 'employee'" />
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import AdminDashCard from '@/components/dashcompo/DashView.vue'
  import HrDashCard from './cards/hr/HrDashCard.vue';
  import EmpDashCard from '@/components/employee/EmployeeDashboard.vue';
  
  export default {
    components: {
      AdminDashCard,
      HrDashCard,
      EmpDashCard,
    },
    setup() {
      const store = useStore();
      
      // Get user role from Vuex store
      const userRole = computed(() => store.getters['roles/userRole']);
  
      return {
        userRole,
      };
    },
  };
  </script>
  
  <style>
  /* Add your styles here if needed */
  </style>
  