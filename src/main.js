import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router/Index.js';
const app = createApp(App);
app.use(router);  // Use the router
app.mount('#app');
