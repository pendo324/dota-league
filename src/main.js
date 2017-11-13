// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import io from 'socket.io-client';
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueSocketio from 'vue-socket.io';
import VueScrollTo from 'vue-scrollto';
import 'vue2-animate/dist/vue2-animate.min.css';
import './styles/style.scss';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueScrollTo);

/* eslint-disable import/first */
import store from './store';

const socketInstance = io('http://127.0.0.1:9090', {
  transports: ['polling']
});

Vue.use(VueSocketio, socketInstance, store);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
