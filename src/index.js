import Vue from 'vue';

import AppView from './view/app.vue';
import store from './store';

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
