import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import { createPinia } from 'pinia';
import { directive as motion } from '@vueuse/motion';
import Toast, { PluginOptions } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

const pinia = createPinia();

app.use(pinia)
app.use(router)
app.use(Toast);
app.directive(motion)
app.mount("#app");





