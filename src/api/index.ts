import URL from 'url';
import assert from 'assert';
import GetData from './get-data';
import Questlist from './questlist';
import Map from './map';
import { parseShip, mergeShips } from './ship';
import { parseDeck, mergeDecks, APIDeck } from './deck';
import { parseSlotitem } from './slot-item';

function parseBody(body) {
  assert(body.search(/^svdata=/) === 0);
  return JSON.parse(body.substr(7));
}

export default {
  mergeShips,
  mergeDecks,
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
      const slotitems = body.api_data.api_slot_item.map(d => parseSlotitem(d));
      return {
        slotitems,
      };
    }
    if (url.pathname === '/kcsapi/api_get_member/questlist') {
      const payload = Questlist.parse(body);
      return payload;
    }
    if (url.pathname === '/kcsapi/api_port/port') {
      const ships = body.api_data.api_ship.map(d => parseShip(d));
      const decks = body.api_data.api_deck_port.map(d => parseDeck(d));
      return { ships, decks };
    }
    if (url.pathname === '/kcsapi/api_get_member/slot_item') {
      const slotitems = body.api_data.map(d => parseSlotitem(d));
      return {
        slotitems,
      };
    }
    if (url.pathname === '/kcsapi/api_get_member/ship_deck') {
      const ships = body.api_data.api_ship_data.map(d => parseShip(d));
      const decks = body.api_data.api_deck_data.map(d => parseDeck(d));
      return {
        ships,
        decks,
      };
    }
    if (url.pathname === '/kcsapi/api_get_member/ship3') {
      const ships = body.api_data.api_ship_data.map(d => parseShip(d));
      const decks = body.api_data.api_deck_data.map(d => parseDeck(d));
      return {
        ships,
        decks,
      };
    }
    if (url.pathname === '/kcsapi/api_get_member/deck') {
      const decks = body.api_data.map(d => parseDeck(d));
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
