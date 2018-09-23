export interface Map {
  id: number;
  isEvent: boolean;
  nowHp: number;
  maxHp: number;
  rank: number;
  cleared: boolean;
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
  maxFuel: number;
  maxBullet: number;
  maxSpaces: Array<number>;
}

export interface Message {
  text: string;
}
