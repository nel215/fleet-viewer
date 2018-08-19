import Vue from 'vue';
import URL from 'url';
import uuid from 'uuid/v4';
import assert from 'assert';

import QuestStore from './store/quest';
import AppView from './view/app.vue';
import store from './store';

import './stylus/index.styl';

function parseBody(body) {
  assert(body.search(/^svdata=/) === 0);
  return JSON.parse(body.substr(7));
}

function handleMessage(message) {
  const url = URL.parse(message.url);
  const body = parseBody(message.body);
  console.log(url);
  console.log(body);
  if (url.pathname === '/kcsapi/api_get_member/questlist') {
    QuestStore.updateQuests(body);
  }
  if (url.pathname === '/kcsapi/api_port/port') {
    store.dispatch('handlePort', {
      body,
    });
  }
}
const port = browser.runtime.connect({
  name: uuid(),
});
port.onMessage.addListener(handleMessage);

new Vue({
  el: '#app',
  store,
  render: h => h(AppView),
});
