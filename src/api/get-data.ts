import { MissionMaster, ShipMaster, SlotitemMaster } from '../store/types';

export function parseShips(data) {
  return data.reduce((a, d) => {
    Object.assign(a, {
      [d.api_id]: <ShipMaster>{
        id: d.api_id,
        name: d.api_name,
        stype: d.api_stype,
        ctype: d.api_ctype,
        maxFuel: d.api_fuel_max,
        maxBullet: d.api_bull_max,
        maxSpaces: d.api_maxeq,
      },
    });
    return a;
  }, {});
}

function getIsAirPower(d) {
  return [5, 36, 40, 43].some(t => t === d.api_type[1]);
}

export function parseSlotitems(data) {
  return data.reduce((a, d) => {
    const s = <SlotitemMaster>{
      id: d.api_id,
      name: d.api_name,
      tyku: d.api_tyku,
      type: d.api_type[2],
      los: d.api_saku,
      isAirPower: getIsAirPower(d),
    };
    Object.assign(a, { [d.api_id]: s }, {});
    return a;
  }, {});
}

export function parseMissions(data) {
  return data.reduce((a, d) => {
    const s = <MissionMaster>{
      id: d.api_id,
      name: d.api_name,
      detail: d.api_details,
      time: d.api_time,
    };
    Object.assign(a, { [s.id]: s }, {});
    return a;
  }, {});
}

export function parseMap(data) {
  return data.reduce((a, d) => {
    const m = {
      id: d.api_id,
      name: d.api_name,
      operation: d.api_opetext,
    };
    Object.assign(a, { [m.id]: m }, {});
    return a;
  }, {});
}

export default {
  parseSlotitems,
  parseShips,
  parseMissions,
  parseMap,
};
