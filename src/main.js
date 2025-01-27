import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router/Index.js';
import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import store from '@/store/Index.js';
import apiClient  from './service/Index';

apiClient.interceptors.request.use((config) => {
    const token = store.getters['auth/getToken'];
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
const app = createApp(App);
app.use(router);
app.use(store)  // Use the router
app.mount('#app');
