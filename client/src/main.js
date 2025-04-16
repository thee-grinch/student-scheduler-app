// client/src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './style.css';
import { useUserStore } from './store/user';

const app = createApp(App);
app.use(createPinia());
app.use(router);

const userStore = useUserStore();

(async () => {
  await userStore.initializeUser(); // Ensure the user is initialized before mounting the app
  app.mount('#app');
})();