import Vue from 'vue';
import VueMdl from 'vue-mdl';
import VueRouter from 'vue-router';

import AppView from './view/app.vue';
import HomeView from './view/home.vue';
import SallyView from './view/sally.vue';
import store from './store';

import './stylus/index.styl';
import '../node_modules/material-design-lite/material.min';

Vue.use(VueMdl);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [{ path: '/home', component: HomeView }, { path: '/sally', component: SallyView }],
});

new Vue({
  el: '#app',
  store,
  mounted() {
    console.log('mounted');
    store.dispatch('initialize');
    router.push('/home');
  },
  router,
  render: h => h(AppView),
});
