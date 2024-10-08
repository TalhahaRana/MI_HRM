import Vue from 'vue';
import Vuex from 'vuex';

// Import all modules
import auth from './AuthModule';
import role from './RoleModule';
import employee from './Employee';
import admin from './Admin';
import hr from './Hr';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    role,
    employee,
    admin,
    hr,
  },
});
