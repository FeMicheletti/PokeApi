import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue';

import { createPinia } from 'pinia';
import piniaPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue';
import router from './router';

import './assets/custom.scss'

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPersistedstate);

app.use(pinia);
app.use(router);

app.mount('#app');
