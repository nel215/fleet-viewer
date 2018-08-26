export interface QuestlistPayload {
  page: number;
  quests: Array<Quest>;
}

export interface Master {
  ships: Object;
  slotitems: Object;
  missions: Object;
}

export interface State {
  master: Master;
  ships: Object;
  slotitems: Object;
  decks: Object;
  quests: Object;
}

export interface Quest {
  id: number;
  title: string;
  page: number;
}

export interface Ship {
  id: number;
  shipId: number;
  fuel: number;
  bullet: number;
}

export interface Mission {
  id: number;
  end: number;
}

export interface Deck {
  id: number;
  shipIds: Array<number>;
  mission: Mission;
}

export interface Slotitem {
  id: number;
  slotitemId: number;
  locked: boolean;
  level: number;
  airLevel: number;
}

export interface MissionMaster {
  id: number;
  name: string;
  detail: string;
  time: number;
}

export interface ShipMaster {
  id: number;
  name: string;
  stype: number;
  ctype: number;
  maxFuel: number;
  maxBullet: number;
  maxSpaces: Array<number>;
}

export interface SlotitemMaster {
  id: number;
  name: string;
  tyku: number;
}
