import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";  // Custom styles should typically come after Bootstrap

// Import Bootstrap CSS and JS
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap";

// Import Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css';

// Create and mount the app
const app = createApp(App);

app.use(router); // Use the router instance
app.mount("#app"); // Mount the app to the DOM
