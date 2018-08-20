import Vue from 'vue';

import AppView from './view/app.vue';
import store from './store';
import '../node_modules/material-design-lite/material.min';

import './stylus/index.styl';

new Vue({
  el: '#app',
  store,
  mounted() {
    console.log('mounted');
    store.dispatch('fetchMaster');
  },
  render: h => h(AppView),
});
