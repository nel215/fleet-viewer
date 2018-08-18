import Vue from 'vue';
import URL from 'url';
import uuid from 'uuid/v4';
import assert from 'assert';

import QuestStore from './store/quest';
import QuestView from './view/quest';

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
    console.log(QuestStore.state);
  }
}
const port = browser.runtime.connect({
  name: uuid(),
});
port.onMessage.addListener(handleMessage);

const vm = new Vue({
  el: '#app',
  render: h => h(QuestView),
});
