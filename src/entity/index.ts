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
  shipId: number;
  fuel: number;
  bullet: number;
  los: number;
}

export interface Message {
  text: string;
}
