import {
  parseSlotitems, parseShips, parseMissions, parseMap,
} from './get-data';

export function parseMaster(api_data) {
  const slotitems = parseSlotitems(api_data.api_mst_slotitem);
  const ships = parseShips(api_data.api_mst_ship);
  const missions = parseMissions(api_data.api_mst_mission);
  const maps = parseMap(api_data.api_mst_mapinfo);
  return {
    master: {
      ships,
      slotitems,
      missions,
      maps,
    },
  };
}

export default {
  parseMaster,
};
