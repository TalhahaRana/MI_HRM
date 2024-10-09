import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons"; // Import any icon you need
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons

// Add FontAwesome icons to the library
library.add(faUserSecret);

// Create the Vue application
const app = createApp(App);

// Register the FontAwesomeIcon component
app.component("font-awesome-icon", FontAwesomeIcon);

// Use the router
app.use(router);

// Mount the application
app.mount("#app");
