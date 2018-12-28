import URL from 'url';
import assert from 'assert';
import GetData from './get-data';
import Questlist from './questlist';
import Map from './map';
import { parseShip, mergeShips } from './ship';
import { parseDeck, mergeDecks, APIDeck } from './deck';
import { parseMaster } from './master';
import { parseSlotitem } from './slot-item';
import AirBase from './air-base';

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
      const master = parseMaster(body.api_data);
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
      const maps = Map.parse(body.api_data.api_map_info);
      const airBases = AirBase.parse(body.api_data.api_air_base);
      console.log(JSON.parse(JSON.stringify(airBases)));
      return {
        maps,
        airBases,
      };
    }
    return {};
  },
};
