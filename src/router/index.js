import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Home from '@/components/Home';
import Lobby from '@/components/Lobby';
import Dashboard from '@/components/Dashboard';
import Queuing from '@/components/Dashboard/Queuing';
import Match from '@/components/Dashboard/Match';
import store from '../store';

Vue.use(Router);

const requireAuth = (to, from, next) => {
  store.dispatch('getUser').then((user) => {
    if (user) {
      next();
    }
  }).catch(() => {
    next('/');
  });
};

export default new Router({
  routes: [{
    path: '/',
    name: 'Hello',
    component: Hello
  }, {
    path: '/home',
    name: 'Home',
    component: Dashboard,
    beforeEnter: requireAuth,
    children: [{
      name: 'queuing',
      path: '',
      component: Queuing,
      children: [{
        name: 'match',
        path: 'match',
        component: Match
      }]
    }]
  }, {
    path: '/lobbies',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth,
    children: [{
      name: 'lobby',
      path: 'lobby/:id',
      component: Lobby
    }]
  }]
});
