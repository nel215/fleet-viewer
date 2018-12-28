export class APISlotitem {
  id: number;

  slotitemId: number;

  locked: boolean;

  level: number;

  airLevel: number;
}

export enum ItemType {
  Invalid = -1,
  SmallCaliberMainGun = 1,
  Fighter = 6,
  DiveBomber = 7,
  TorpedoBomber = 8,
  SeaplaneBomber = 11,
  SeaplaneFighter = 45,
}

export function parseSlotitem(d) {
  return <APISlotitem>{
    id: d.api_id,
    slotitemId: d.api_slotitem_id,
    locked: d.api_locked === 1,
    level: d.api_level,
    airLevel: d.api_alv || 0,
  };
}

export default {
  parseSlotitem,
  APISlotitem,
};
