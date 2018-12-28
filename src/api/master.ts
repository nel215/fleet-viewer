import {
  parseSlotitems, parseShips, parseMissions, parseMap, SlotitemMaster,
} from './get-data';
import { ItemType } from './slot-item';

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

export function getMasterSlotitem(master, slotitemId): SlotitemMaster {
  if (!(slotitemId in master.slotitems)) {
    return <SlotitemMaster>{
      id: NaN,
      name: '?',
      type: ItemType.Invalid,
      tyku: 0,
      los: 0,
    };
  }
  return master.slotitems[slotitemId];
}

export default {
  parseMaster,
};
