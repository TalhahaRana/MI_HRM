import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

import 'bootstrap-icons/font/bootstrap-icons.css';

import "bootstrap"; // Import Bootstrap JS (optional)

const app = createApp(App);

app.use(router);

app.mount("#app");
