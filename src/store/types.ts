export interface QuestlistPayload {
  page: number;
  quests: Array<Quest>;
}

export interface Quest {
  id: number;
  title: string;
  page: number;
}

export interface Ship {
  id: number;
  shipId: number;
}

export interface Deck {
  id: number;
  shipIds: Array<number>;
}

export interface MissionMaster {
  id: number;
  name: string;
  detail: string;
  time: number;
}
