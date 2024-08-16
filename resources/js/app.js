import './bootstrap';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import { useAuthStore } from './store/auth';
import router from './router/router';
import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as FaIcons from "oh-vue-icons/icons/fa";
import * as MdIcons from "oh-vue-icons/icons/md";

import App from "./App.vue";
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
const app = createApp(App);

const Fa = Object.values({ ...FaIcons });
addIcons(...Fa);

app.use(pinia)
app.use(router)
app.component('v-icon', OhVueIcon);
app.mount('#app');

const authStore = useAuthStore();