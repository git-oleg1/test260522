
import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from '@/router/router';
import App from '@/App.vue';
import '@/assets/styles/app.css';

const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.mount('#app');
