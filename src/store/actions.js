import URL from 'url';
import uuid from 'uuid/v4';
import assert from 'assert';
import QuestStore from './quest';

function parseShip(data) {
  return {
    id: data.api_id,
    ship_id: data.api_ship_id,
    lv: data.api_lv,
    hp: data.api_nowhp,
    maxhp: data.api_maxhp,
    fuel: data.api_fuel,
    bull: data.api_bull,
    cond: data.api_cond,
    slot: data.api_slot,
  };
}

function parseBody(body) {
  assert(body.search(/^svdata=/) === 0);
  return JSON.parse(body.substr(7));
}

export default {
  connect(context) {
    const port = browser.runtime.connect({
      name: uuid(),
    });
    port.onMessage.addListener((message) => {
      const url = URL.parse(message.url);
      const body = parseBody(message.body);
      console.log(url);
      console.log(body);
      if (url.pathname === '/kcsapi/api_get_member/questlist') {
        QuestStore.updateQuests(body);
      }
      if (url.pathname === '/kcsapi/api_port/port') {
        context.dispatch('handlePort', {
          body,
        });
      }
    });
  },
  handlePort(context, payload) {
    const ships = [];
    const decks = [];
    for (const d of payload.body.api_data.api_ship) {
      ships.push(parseShip(d));
    }
    for (const d of payload.body.api_data.api_deck_port) {
      decks.push({
        id: d.api_id,
        ship_ids: d.api_ship,
      });
    }
    context.commit('updateShips', { ships });
    context.commit('updateDecks', { decks });
  },
};
