import { createStore } from 'vuex';
// Import all modules
import auth from './AuthModule';
import roles from './RoleModule';
import employee from './Employee';
import admin from './Admin';
import hr from './Hr';
// Vue 3 style store setup
export default createStore({
  modules: {
    auth,
    roles,
    employee,
    admin,
    hr,
  },
});
