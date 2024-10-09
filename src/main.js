import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";  // Custom styles should typically come after Bootstrap

// Import Bootstrap CSS and JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css";

// Import Font Awesome core and Vue component
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Import specific Font Awesome icons
import { faUserSecret } from "@fortawesome/free-solid-svg-icons"; // Example icon

// Add icons to the library
library.add(faUserSecret);

// Create the Vue application
const app = createApp(App);

// Register the FontAwesomeIcon component globally
app.component("font-awesome-icon", FontAwesomeIcon);

// Use the router
app.use(router);

// Mount the application
app.mount("#app");
