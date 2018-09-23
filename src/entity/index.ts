export interface Map {
  id: number;
  isEvent: boolean;
  nowHp: number;
  maxHp: number;
  rank: number;
  cleared: boolean;
}

export interface Mission {
  name: string;
  end: number;
}

export interface Deck {
  id: number;
  shipIds: Array<number>;
  mission: Mission;
}

export class Slotitem {
  name: string;

  airPower: number;
}

export interface Ship {
  id: number;
  name: string;
  lv: number;
  fuel: number;
  bullet: number;
  los: number;
  cond: number;
  hp: number;
  maxHp: number;
  slot: Array<number>;
  slotitems: Array<Slotitem>;
  maxFuel: number;
  maxBullet: number;
  maxSpaces: Array<number>;
}

export interface Message {
  text: string;
}
