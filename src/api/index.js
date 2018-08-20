import URL from 'url';
import assert from 'assert';
import Port from './port';
import GetData from './get-data';
import RequireInfo from './require-info';
import Questlist from './questlist';

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
      const payload = Questlist.parse(body);
      return Object.assign({ type: 'handleQuestList' }, payload);
    }
    if (url.pathname === '/kcsapi/api_port/port') {
      const payload = Port.parse(body);
      return Object.assign({ type: 'handlePort' }, payload);
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
