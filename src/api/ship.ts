import { Ship, Slotitem } from '../entity';
import { APISlotitem, ItemType } from './slot-item';

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
  api_onslot: Array<number>;
  api_slot_ex: number;
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
  api_onslot: Array<number>;
  api_slot_ex: number;
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
    api_onslot: data.api_onslot,
    api_slot_ex: data.api_slot_ex,
  };
}

function getImprovementBonus(itemType, itemLevel) {
  if ([ItemType.Fighter, ItemType.SeaplaneFighter].some(d => d === itemType)) {
    return 0.2 * itemLevel;
  }
  if (itemType === ItemType.DiveBomber) {
    return 0.25 * itemLevel;
  }
  return 0;
}

function getAirBonus(minorType, airLevel): number {
  let bonus = [0, 1, 1, 2, 2, 2, 2, 3][airLevel];
  if ([ItemType.Fighter, ItemType.SeaplaneFighter].some(d => d === minorType)) {
    bonus += [0, 0, 2, 5, 9, 14, 14, 22][airLevel];
  }
  if (minorType === ItemType.SeaplaneBomber) {
    bonus += [0, 0, 1, 1, 1, 3, 3, 6][airLevel];
  }
  return bonus;
}

function getAirPower(space: number, s: APISlotitem, m) {
  if (!m.isAirPower) {
    return 0;
  }
  const antiair = m.tyku;
  const improvementBonus = getImprovementBonus(m.type, s.level);
  let airPower = (antiair + improvementBonus) * Math.sqrt(space);
  airPower += getAirBonus(m.type, s.airLevel);
  airPower = Math.floor(airPower);
  return airPower;
}

function mergeSlotitem(
  id: number,
  space: number,
  slotitems: Record<number, any>,
  master,
): Slotitem {
  if (!(id in slotitems)) {
    return {
      name: '-',
      airPower: 0,
    };
  }
  const slotitem = slotitems[id];
  if (!(slotitem.slotitemId in master.slotitems)) {
    return {
      name: '?',
      airPower: 0,
    };
  }
  const m = master.slotitems[slotitem.slotitemId];
  const airPower = getAirPower(space, slotitem, m);
  return {
    name: m.name,
    airPower,
  };
}

function mergeSlotitems(ship: APIShip, slotitems: Record<number, any>, master) {
  const res = ship.slot.map((id: number, idx: number) => {
    const s = mergeSlotitem(id, ship.api_onslot[idx], slotitems, master);
    return s;
  });
  return res;
}

export function mergeShips(
  ships: Record<number, APIShip>,
  apiSlotitems: Record<number, APISlotitem>,
  master: any,
): Record<number, Ship> {
  return Object.values(ships).reduce((a, s) => {
    const slotitems = mergeSlotitems(s, apiSlotitems, master);
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
