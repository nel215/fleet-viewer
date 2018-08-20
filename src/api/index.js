import URL from 'url';
import assert from 'assert';
import { parseShip } from './ship';
import GetData from './get-data';
import RequireInfo from './require-info';

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
      const master = GetData.parse(body);
      return { type: 'handleGetData', master };
    }
    if (url.pathname === '/kcsapi/api_get_member/require_info') {
      const payload = RequireInfo.parse(body);
      return Object.assign({ type: 'handleRequreInfo' }, payload);
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
