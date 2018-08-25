import SlotitemMaster from '../store/slotitem';
import { MissionMaster, ShipMaster } from '../store/types';

function parseShips(data) {
  return data.reduce((a, d) => {
    Object.assign(a, {
      [d.api_id]: <ShipMaster>{
        id: d.api_id,
        name: d.api_name,
        stype: d.api_stype,
        ctype: d.api_ctype,
        maxFuel: d.api_fuel_max,
        maxBullet: d.api_bull_max,
      },
    });
    return a;
  }, {});
}

function parseSlotitems(data) {
  return data.reduce((a, d) => {
    const s = <SlotitemMaster>{
      id: d.api_id,
      name: d.api_name,
    };
    Object.assign(a, { [d.api_id]: s }, {});
    return a;
  }, {});
}

function parseMissions(data) {
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

function parse(body) {
  const slotitems = parseShips(body.api_data.api_mst_slotitem);
  const ships = parseShips(body.api_data.api_mst_ship);
  const missions = parseMissions(body.api_data.api_mst_mission);
  return {
    ships,
    slotitems,
    missions,
  };
}

export default {
  parse,
};
