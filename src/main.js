import { createApp } from 'vue'
import App from './App.vue'
import store from './stores/store';

const app = createApp(App);
app.provide("store",store);
app.mount('#app');