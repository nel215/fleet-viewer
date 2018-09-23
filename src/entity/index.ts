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
  fuel: number;
  bullet: number;
  los: number;
  maxFuel: number;
  maxBullet: number;
  maxSpaces: Array<number>;
}

export interface Message {
  text: string;
}
