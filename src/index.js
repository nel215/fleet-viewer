import Vue from 'vue';
import VueMdl from 'vue-mdl';

import AppView from './view/app.vue';
import store from './store';

import './sass/index.scss';
import './stylus/index.styl';
import '../node_modules/material-design-lite/material.min';

Vue.use(VueMdl);

new Vue({
  el: '#app',
  store,
  mounted() {
    console.log('mounted');
    store.dispatch('initialize');
  },
  render: h => h(AppView),
});
