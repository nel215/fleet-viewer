import { Map, Message } from '../entity';
import { APIShip } from '../api/ship';
import { APIDeck } from '../api/deck';
import { APISlotitem } from '../api/slot-item';

export interface QuestlistPayload {
  page: number;
  quests: Array<Quest>;
}

export interface Master {
  ships: Object;
  slotitems: Object;
  missions: Object;
  maps: Record<number, any>;
}

export interface State {
  master: Master;
  ships: Record<number, APIShip>;
  slotitems: Record<number, APISlotitem>;
  decks: Record<number, APIDeck>;
  quests: Record<number, Quest>;
  maps: Record<number, Map>;
  message: Message;
}

export enum QuestCategory {
  Formation = 1,
  Sally = 2,
  Expedition = 4,
}

export interface Quest {
  id: number;
  page: number;
  title: string;
  detail: string;
  category: QuestCategory;
  state: number; // TODO: Change to enum
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
  type: ItemType;
  tyku: number;
  los: number;
}

export enum ItemType {
  SmallCaliberMainGun = 1,
  Fighter = 6,
  DiveBomber = 7,
  TorpedoBomber = 8,
  SeaplaneBomber = 11,
  SeaplaneFighter = 45,
}
