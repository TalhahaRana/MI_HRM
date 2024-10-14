import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css"; 
import store from './stores'; // Import the store
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css";
import { QuillEditor } from 'vue-quill-editor'; import 'quill/dist/quill.snow.css'; // Quill CSS

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons"; // Example icon
import ApiServices from '@/services/ApiServices';
// Add icons to the library
library.add(faUserSecret);
const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component('QuillEditor', QuillEditor);
ApiServices.init();
// Use the router
app.use(router);
app.use(store);
// Mount the application
app.mount("#app");
