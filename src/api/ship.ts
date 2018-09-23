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

export interface Ship {}

export function parseShip(data: ShipResponse) {
  return <Ship>{
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

export default {
  parseShip,
};
