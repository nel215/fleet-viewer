import { Ship, Deck } from '../store/types';

export function parseShip(data) {
  return <Ship>{
    id: data.api_id,
    shipId: data.api_ship_id,
    lv: data.api_lv,
    hp: data.api_nowhp,
    maxhp: data.api_maxhp,
    fuel: data.api_fuel,
    bull: data.api_bull,
    cond: data.api_cond,
    slot: data.api_slot,
  };
}

function parseMission(data) {
  return {
    id: data[1],
  };
}

export function parseDeck(data) {
  return <Deck>{
    id: data.api_id,
    shipIds: data.api_ship,
    missions: data.api_mission.map(d => parseMission(d)),
  };
}

export default {
  parseShip,
  parseDeck,
};
