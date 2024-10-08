import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'; // You can import any icon you need
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App)

// Add icons to the library
library.add(faUserSecret);

// Register FontAwesome component globally
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router)

app.mount('#app')
