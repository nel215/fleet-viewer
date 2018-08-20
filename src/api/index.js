import URL from 'url';
import assert from 'assert';
import { parseShip } from './ship';

function parseBody(body) {
  assert(body.search(/^svdata=/) === 0);
  return JSON.parse(body.substr(7));
}

export default {
  createAction(message) {
    const url = URL.parse(message.url);
    console.log(url);
    const body = parseBody(message.body);
    console.log(body);
    if (url.pathname === '/kcsapi/api_start2/getData') {
      const slotitems = body.api_data.api_mst_slotitem.reduce((a, d) => {
        Object.assign(a, {
          [d.api_id]: {
            id: d.api_id,
            name: d.api_name,
          },
        });
        return a;
      }, {});
      const master = {
        slotitems,
      };
      return { type: 'handleGetData', master };
    }
    if (url.pathname === '/kcsapi/api_get_member/require_info') {
      return { type: 'handleRequreInfo' };
    }
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
