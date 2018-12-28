import { Map, Message, Quest } from '../entity';
import { APIShip } from '../api/ship';
import { APIDeck } from '../api/deck';
import { APISlotitem, ItemType } from '../api/slot-item';
import { AirBaseResp } from '../api/air-base';

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
  airBases: Record<number, AirBaseResp>;
  message: Message;
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
