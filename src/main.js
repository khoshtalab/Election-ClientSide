import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from "axios";

import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

/* Vue uses */
Vue.use(Toaster, {timeout: 5000})
Vue.use(VueSweetalert2);

/* Vue configs */
Vue.config.productionTip = false
axios.defaults.baseURL = 'https://election.iran.liara.run/'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";

require('@/store/subscriber')

Vue.config.productionTip = false

let response = {
    status: true,
    token: localStorage.getItem('token'),
    firstname: localStorage.getItem('firstname'),
    lastname: localStorage.getItem('lastname'),
}

store.dispatch('auth/attempt', response).then(() => {
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')

})



