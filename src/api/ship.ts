import { Ship } from '../entity';

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
  fuel: number;
  bullet: number;
}

export function parseShip(data: ShipResponse) {
  return <APIShip>{
    id: data.api_id,
    shipId: data.api_ship_id,
    lv: data.api_lv,
    hp: data.api_nowhp,
    maxhp: data.api_maxhp,
    fuel: data.api_fuel,
    bullet: data.api_bull,
    cond: data.api_cond,
    los: data.api_sakuteki[0],
    slot: data.api_slot,
  };
}

export function mergeShips(
  ships: Record<number, APIShip>,
  masterShips: Record<number, any>,
): Record<number, Ship> {
  return Object.values(ships).reduce((a, s) => {
    if (s.shipId in masterShips) {
      const m = masterShips[s.shipId];
      const res: Ship = {
        id: s.id,
        fuel: s.fuel,
        bullet: s.bullet,
        los: m.los,
        maxFuel: m.maxFuel,
        maxBullet: m.maxBullet,
        maxSpaces: m.maxSpaces,
      };
      return Object.assign(a, { [res.id]: res });
    }
    const res: Ship = {
      id: s.id,
      fuel: s.fuel,
      bullet: s.bullet,
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
