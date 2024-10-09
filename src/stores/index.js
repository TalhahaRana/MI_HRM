import { createStore } from 'vuex';
// Import all modules
import auth from './AuthModule';
import role from './RoleModule';
import employee from './Employee';
import admin from './Admin';
import hr from './Hr';

// Vue 3 style store setup
export default createStore({
  modules: {
    auth,
    role,
    employee,
    admin,
    hr,
  },
});
