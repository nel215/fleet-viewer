export interface QuestlistPayload {
  page: number;
  quests: Array<Quest>;
}

export interface Quest {
  id: number;
  title: string;
  page: number;
}
