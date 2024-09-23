import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/css/bootstrap.min.css'
import './assets/css/icons.min.css'
import './assets/css/app.min.css'


import VeeValidatePlugin from './utils/validation';
import VueSweetAlert2 from 'vue-sweetalert2';
import Vpagination from '@hennge/vue3-pagination';
import 'sweetalert2/dist/sweetalert2.min.css';
import '@hennge/vue3-pagination/dist/vue3-pagination.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VeeValidatePlugin);
app.component('v-pagination', Vpagination);
app.use(VueSweetAlert2, {
    confirmButtonColor: '#A95EEA',
    cancelButtonColor: '#FF7674',
});

app.mount('#app');
import 'bootstrap';
import './assets/libs/metismenujs/metismenujs.min';
import './assets/libs/simplebar/simplebar.min';
import './assets/libs/feather-icons/feather.min';