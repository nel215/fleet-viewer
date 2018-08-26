import uuid from 'uuid/v4';
import Vue from 'vue';
import { State } from '../store/types';

interface Slotitem {
  id: string;
  name: String;
  shortName: String;
}

interface Ship {
  name: String;
  lv: Number;
  hp: Number;
  maxhp: Number;
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
  slotitems: Array<Slotitem>;
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
  const item = <Slotitem>{
    id: uuid(),
    name: '-',
    shortName: '-',
  };
  return item;
}

function createDummyShip() {
  return <Ship>{
    name: '-',
    lv: 0,
    hp: 0,
    maxhp: 0,
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
  };
}

function createSlotitemsByIds(state: State, ids) {
  const slotitems = ids.map((id: number) => {
    if (!(id in state.slotitems)) {
      return createDummySlotitem();
    }
    const slotitem = state.slotitems[id];
    if (slotitem.slotitemId in state.master.slotitems) {
      const m = state.master.slotitems[slotitem.slotitemId];
      return <Slotitem>{
        id: uuid(),
        name: m.name,
        shortName: m.name.substr(0, 1),
      };
    }
    return <Slotitem>{
      id: uuid(),
      name: 'Unknown',
      shortName: '?',
    };
  });
  return slotitems;
}

export default Vue.extend({
  props: {
    shipId: Number,
  },
  methods: {},
  computed: {
    ship(): Object {
      const { state } = this.$store;
      if (!(this.shipId in state.ships)) {
        return createDummyShip();
      }
      const ship = state.ships[this.shipId];
      if (!(ship.shipId in state.master.ships)) {
        return createDummyShip();
      }
      const m = state.master.ships[ship.shipId];
      const slotitems = createSlotitemsByIds(state, ship.slot);
      const hpColor = getHpColor(ship.hp, ship.maxhp);
      const fuelPercentage = `${Math.floor((ship.fuel / m.maxFuel) * 100)}%`;
      const bulletPercentage = `${Math.floor((ship.bullet / m.maxBullet) * 100)}%`;
      const fuelColor = getFuelOrBulletColor(ship.fuel, m.maxFuel);
      const bulletColor = getFuelOrBulletColor(ship.bullet, m.maxBullet);
      return <Ship>{
        name: m.name,
        lv: ship.lv,
        hp: ship.hp,
        hpColor,
        maxhp: ship.maxhp,
        cond: ship.cond,
        bullet: ship.bullet,
        maxBullet: m.maxBullet,
        bulletPercentage,
        bulletColor,
        fuel: ship.fuel,
        maxFuel: m.maxFuel,
        fuelPercentage,
        fuelColor,
        slotitems,
      };
    },
  },
});
