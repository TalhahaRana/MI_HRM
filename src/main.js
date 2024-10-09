import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js' // Ensure the correct path to the router file
import 'bootstrap/dist/css/bootstrap.min.css'


const app = createApp(App)

app.use(router)

app.mount('#app')
