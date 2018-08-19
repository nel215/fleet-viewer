import URL from 'url';
import assert from 'assert';

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
  parseMaster(body) {
    return parseBody(body);
  },
  createAction(message) {
    const url = URL.parse(message.url);
    const body = parseBody(message.body);
    console.log(url);
    console.log(body);
    if (url.pathname === '/kcsapi/api_get_member/questlist') {
      const quests = body.api_data.api_list.map(d => ({
        id: d.api_no,
        title: d.api_title,
        detail: d.api_detail,
        state: d.api_state,
        progress: d.api_progress_flag,
      }));
      return {
        type: 'handleQuestList',
        quests,
      };
    }
    if (url.pathname === '/kcsapi/api_port/port') {
      const ships = body.api_data.api_ship.map(d => parseShip(d));
      const decks = body.api_data.api_deck_port.map(d => ({
        id: d.api_id,
        ship_ids: d.api_ship,
      }));
      return {
        type: 'handlePort',
        ships,
        decks,
      };
    }
    if (url.pathname === '/kcsapi/api_get_member/ship_deck') {
      const ships = body.api_data.api_ship_data.map(d => parseShip(d));
      return {
        type: 'handleShipDeck',
        ships,
      };
    }
    return null;
  },
};
