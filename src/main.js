import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import CKEditor from '@ckeditor/ckeditor5-vue';

createApp(App)
  .use(store)
  .use(router)
  .use(CKEditor)
  .use(VueAxios, axios)
  .mount('#app');
