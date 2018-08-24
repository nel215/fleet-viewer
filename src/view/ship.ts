import Vue from 'vue';
import { State } from '../store/types';

interface Slotitem {
  name: String;
  shortName: String;
}

interface Ship {
  name: String;
  lv: Number;
  hp: Number;
  maxhp: Number;
  cond: Number;
  slotitems: Array<Slotitem>;
}

function createDummySlotitem() {
  const item = <Slotitem>{
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
    cond: 0,
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
        key: id.toString(),
        name: m.name,
        shortName: m.name.substr(0, 1),
      };
    }
    return <Slotitem>{
      key: id.toString(),
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
  methods: {
    getHpColorClass(ship) {
      if (ship.hp * 4 <= ship.maxhp) {
        return 'mdl-color--red';
      }
      if (ship.hp * 2 <= ship.maxhp) {
        return 'mdl-color--orange';
      }
      if (ship.hp * 4 <= ship.maxhp * 3) {
        return 'mdl-color--yellow';
      }
      return 'mdl-color--green';
    },
  },
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
      return <Ship>{
        name: m.name,
        lv: ship.lv,
        hp: ship.hp,
        maxhp: ship.maxhp,
        cond: ship.cond,
        slotitems,
      };
    },
  },
});
