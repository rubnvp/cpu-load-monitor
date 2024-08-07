import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { checkNotificationPermission } from "./boot/notifications";

const app = createApp(App);

app.use(createPinia());
app.use(router);

checkNotificationPermission();

app.mount("#app");
