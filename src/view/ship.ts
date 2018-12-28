import uuid from 'uuid/v4';
import Vue from 'vue';
import { State } from '../store/types';
import { Ship, Slotitem } from '../entity';

interface SlotitemViewModel {
  id: string;
  name: String;
  shortName: String;
}

interface ShipViewModel {
  name: String;
  lv: Number;
  hp: Number;
  maxHp: Number;
  hpColor: string;
  cond: Number;
  fuel: number;
  maxFuel: number;
  fuelPercentage: string;
  fuelColor: string;
  bullet: number;
  maxBullet: number;
  bulletPercentage: string;
  bulletColor: string;
  slotitems: Array<SlotitemViewModel>;
  exSlotitem: SlotitemViewModel;
}

function getHpColor(now, max) {
  if (max === 0) {
    return 'mdl-color--grey-400 mdl-color-text--white';
  }
  if (now * 4 <= max) {
    return 'mdl-color--red-600 mdl-color-text--white';
  }
  if (now * 2 <= max) {
    return 'mdl-color--orange-600 mdl-color-text--white';
  }
  if (now * 4 <= max * 3) {
    return 'mdl-color--yellow-700 mdl-color-text--white';
  }
  return 'mdl-color--green-600 mdl-color-text--white';
}

function getFuelOrBulletColor(now, max) {
  if (max === 0) {
    return 'mdl-color--grey-400 mdl-color-text--white';
  }
  if (now * 10 < max * 2) {
    return 'mdl-color--red-600 mdl-color-text--white';
  }
  if (now * 10 < max * 4) {
    return 'mdl-color--orange-600 mdl-color-text--white';
  }
  if (now * 10 < max * 6) {
    return 'mdl-color--yellow-700 mdl-color-text--white';
  }
  return 'mdl-color--green-600 mdl-color-text--white';
}

function createDummySlotitem() {
  const item = <SlotitemViewModel>{
    id: uuid(),
    name: '-',
    shortName: '-',
  };
  return item;
}

function createDummyShip() {
  return <ShipViewModel>{
    name: '-',
    lv: 0,
    hp: 0,
    maxHp: 0,
    hpColor: getHpColor(0, 0),
    cond: 0,
    fuel: 0,
    maxFuel: 0,
    fuelPercentage: '0%',
    fuelColor: getFuelOrBulletColor(0, 0),
    bullet: 0,
    maxBullet: 0,
    bulletPercentage: '0%',
    bulletColor: getFuelOrBulletColor(0, 0),
    slotitems: [0, 0, 0, 0, 0].map(createDummySlotitem),
    exSlotitem: createDummySlotitem(),
  };
}

function createSlotitem(s: Slotitem) {
  return <SlotitemViewModel>{
    id: uuid(),
    name: s.name,
    shortName: s.name.substr(0, 1),
  };
}

export default Vue.extend({
  props: {
    shipId: Number,
  },
  methods: {},
  computed: {
    ship(): Object {
      const { state } = this.$store;
      const ship: Ship = this.$store.getters.getShipById(this.shipId);
      if (ship === undefined) {
        return createDummyShip();
      }
      const fuelPercentage = `${Math.floor((ship.fuel / ship.maxFuel) * 100)}%`;
      const bulletPercentage = `${Math.floor((ship.bullet / ship.maxBullet) * 100)}%`;
      const hpColor = getHpColor(ship.hp, ship.maxHp);
      const fuelColor = getFuelOrBulletColor(ship.fuel, ship.maxFuel);
      const bulletColor = getFuelOrBulletColor(ship.bullet, ship.maxBullet);
      const slotitems = ship.slotitems.map(d => createSlotitem(d));
      const exSlotitem = createSlotitem(ship.exSlotitem);

      return <ShipViewModel>{
        name: ship.name,
        lv: ship.lv,
        hp: ship.hp,
        hpColor,
        maxHp: ship.maxHp,
        cond: ship.cond,
        bullet: ship.bullet,
        maxBullet: ship.maxBullet,
        bulletPercentage,
        bulletColor,
        fuel: ship.fuel,
        maxFuel: ship.maxFuel,
        fuelPercentage,
        fuelColor,
        slotitems,
        exSlotitem,
      };
    },
  },
});
