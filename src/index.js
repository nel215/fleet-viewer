import Vue from 'vue';
import URL from 'url';
import uuid from 'uuid/v4';
import assert from 'assert';

import PortAction from './action/port';
import QuestStore from './store/quest';
import ShipView from './view/ship';

function parseBody(body) {
  assert(body.search(/^svdata=/) === 0);
  return JSON.parse(body.substr(7));
}

const portAction = new PortAction();

function handleMessage(message) {
  const url = URL.parse(message.url);
  const body = parseBody(message.body);
  console.log(url);
  console.log(body);
  if (url.pathname === '/kcsapi/api_get_member/questlist') {
    QuestStore.updateQuests(body);
    console.log(QuestStore.state);
  }
  if (url.pathname === '/kcsapi/api_port/port') {
    portAction.execute(body);
  }
}
const port = browser.runtime.connect({
  name: uuid(),
});
port.onMessage.addListener(handleMessage);

const vm = new Vue({
  el: '#app',
  render: h => h(ShipView),
});
