import uuid from 'uuid/v4';
import Vue from 'vue';
import { mapState } from 'vuex';
import State from '../store/state';

interface Slotitem {
  key: String;
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
    key: `${uuid()}`,
    name: '-',
    shortName: '-',
  };
  return item;
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
  console.log(slotitems);
  return slotitems;
}

function createDummyShip(state: State) {
  const m = state.master.ships[1] || { name: '-' };
  return <Ship>{
    name: m.name,
    lv: 0,
    hp: 0,
    maxhp: 0,
    cond: 0,
    slotitems: createSlotitemsByIds(state, [1, 1, 1, -1, -1]),
  };
}

function createDummyShips(state: State): Array<Ship> {
  const ships = [];
  while (ships.length < 7) {
    ships.push(createDummyShip(state));
  }
  return ships;
}

function createShip(state: State, shipId) {
  if (!(shipId in state.ships)) {
    return createDummyShip(state);
  }
  const ship = state.ships[shipId];
  if (!(ship.shipId in state.master.ships)) {
    return createDummyShip(state);
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
}

export default Vue.extend({
  props: {
    deckId: Number,
  },
  computed: mapState({
    ships(state: State) {
      console.log(JSON.parse(JSON.stringify(state)));
      const { deckId } = this as any;
      console.log(deckId);
      if (!(deckId in state.decks)) {
        return createDummyShips(state);
      }
      const deck = state.decks[deckId];
      console.log(JSON.parse(JSON.stringify(deck)));
      const ships = deck.ship_ids.map((shipId) => {
        const ship = createShip(state, shipId);
        return ship;
      });
      return ships;
    },
  }),
});
