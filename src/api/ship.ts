import { Ship } from '../entity';
import { APISlotitem } from './slot-item';

interface ShipResponse {
  api_id: number;
  api_ship_id: number;
  api_lv: number;
  api_nowhp: number;
  api_maxhp: number;
  api_fuel: number;
  api_bull: number;
  api_cond: number;
  api_sakuteki: Array<number>;
  api_slot: Array<number>;
}

export interface APIShip {
  id: number;
  shipId: number;
  lv: number;
  hp: number;
  maxHp: number;
  cond: number;
  fuel: number;
  bullet: number;
  slot: Array<number>;
}

export function parseShip(data: ShipResponse) {
  return <APIShip>{
    id: data.api_id,
    shipId: data.api_ship_id,
    lv: data.api_lv,
    hp: data.api_nowhp,
    maxHp: data.api_maxhp,
    fuel: data.api_fuel,
    bullet: data.api_bull,
    cond: data.api_cond,
    los: data.api_sakuteki[0],
    slot: data.api_slot,
  };
}

function mergeSlotitem(id: number, slotitems: Record<number, any>, master) {
  if (!(id in slotitems)) {
    return {
      name: '-',
    };
  }
  const slotitem = slotitems[id];
  if (!(slotitem.slotitemId in master.slotitems)) {
    return {
      name: '?',
    };
  }
  const m = master.slotitems[slotitem.slotitemId];
  return {
    name: m.name,
  };
}

function mergeSlotitems(slotitemIds, slotitems: Record<number, any>, master) {
  const res = slotitemIds.map((id: number) => mergeSlotitem(id, slotitems, master));
  return res;
}

export function mergeShips(
  ships: Record<number, APIShip>,
  apiSlotitems: Record<number, APISlotitem>,
  master: any,
): Record<number, Ship> {
  return Object.values(ships).reduce((a, s) => {
    const slotitems = mergeSlotitems(s.slot, apiSlotitems, master);
    if (s.shipId in master.ships) {
      const m = master.ships[s.shipId];
      const res: Ship = {
        id: s.id,
        name: m.name,
        lv: s.lv,
        hp: s.hp,
        maxHp: s.maxHp,
        cond: s.cond,
        fuel: s.fuel,
        bullet: s.bullet,
        slot: s.slot,
        slotitems,
        los: m.los,
        maxFuel: m.maxFuel,
        maxBullet: m.maxBullet,
        maxSpaces: m.maxSpaces,
      };
      return Object.assign(a, { [res.id]: res });
    }
    const res: Ship = {
      id: s.id,
      name: '-',
      lv: s.lv,
      hp: s.hp,
      maxHp: s.maxHp,
      cond: s.cond,
      fuel: s.fuel,
      bullet: s.bullet,
      slot: s.slot,
      slotitems,
      los: NaN,
      maxFuel: NaN,
      maxBullet: NaN,
      maxSpaces: [],
    };
    return Object.assign(a, { [res.id]: res });
  }, {});
}

export default {
  parseShip,
};
