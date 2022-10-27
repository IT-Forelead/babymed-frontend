import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import 'flowbite';
import router from "./router";
import DashboardLayout from "./layout/DashboardLayout.vue";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.component("dashboard-layout", DashboardLayout);
app.mount("#app");
