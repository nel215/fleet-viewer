import URL from 'url';
import assert from 'assert';
import Port from './port';
import GetData from './get-data';
import RequireInfo from './require-info';
import Questlist from './questlist';
import Parser from './parser';
import SlotItem from './slot-item';
import Map from './map';

function parseBody(body) {
  assert(body.search(/^svdata=/) === 0);
  return JSON.parse(body.substr(7));
}

export default {
  parse(message) {
    const url = URL.parse(message.url);
    console.log(url);
    const body = parseBody(message.body);
    console.log(body);
    if (url.pathname === '/kcsapi/api_start2/getData') {
      const master = GetData.parse(body);
      return master;
    }
    if (url.pathname === '/kcsapi/api_get_member/require_info') {
      const payload = RequireInfo.parse(body);
      return payload;
    }
    if (url.pathname === '/kcsapi/api_get_member/questlist') {
      const payload = Questlist.parse(body);
      return payload;
    }
    if (url.pathname === '/kcsapi/api_port/port') {
      const payload = Port.parse(body);
      return payload;
    }
    if (url.pathname === '/kcsapi/api_get_member/slot_item') {
      const payload = SlotItem.parse(body);
      return payload;
    }
    if (url.pathname === '/kcsapi/api_get_member/ship_deck') {
      const ships = body.api_data.api_ship_data.map(d => Parser.parseShip(d));
      return {
        ships,
      };
    }
    if (url.pathname === '/kcsapi/api_get_member/ship3') {
      const ships = body.api_data.api_ship_data.map(d => Parser.parseShip(d));
      const decks = body.api_data.api_deck_data.map(d => Parser.parseDeck(d));
      return {
        ships,
        decks,
      };
    }
    if (url.pathname === '/kcsapi/api_get_member/deck') {
      const decks = body.api_data.map(d => Parser.parseDeck(d));
      return {
        decks,
      };
    }
    if (url.pathname === '/kcsapi/api_get_member/mapinfo') {
      // TODO:
      const maps = Map.parse(body.api_data.api_map_info);
      return {
        maps,
      };
    }
    return {};
  },
};
