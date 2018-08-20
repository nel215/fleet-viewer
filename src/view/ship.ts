import {mapState }from 'vuex';

interface Slotitem {
  name: String;
  shortName: String;
}

function createSlotitemsByIds(state, ids) {
  const slotitems = [];
  ids.forEach((id) => {
    if (!(id in state.slotitems)) {
      return;
    }
    const slotitem = state.slotitems[id];
    if (slotitem.slotitemId in state.master.slotitems) {
      const m = state.master.slotitems[slotitem.slotitemId];
      console.log(JSON.stringify(slotitem));
      slotitems.push(<Slotitem>{
        name: m.name,
        shortName: m.name.substr(0, 1),
      });
    } else {
      slotitems.push(<Slotitem>{
        name: 'Unknown',
        shortName: '?',
      });
    }
  });
  console.log(slotitems);
  return slotitems;
}

export default {
  data() {
    return {};
  },
  computed: mapState({
    deckShips(state: any) {
      const masterSlotitems = state.master.slotitems;
      if (masterSlotitems === undefined) {
        return [];
      }
      const deckShips = Object.values(state.decks).map((deck: any) => {
        const ships = [];
        deck.ship_ids.forEach((shipId) => {
          if (shipId === -1) {
            return;
          }
          const ship = state.ships[shipId];
          // TODO: Fix below
          const slotitems = createSlotitemsByIds(state, ship.slot);
          Object.assign(ship, { slotitems });
          ships.push(ship);
        });
        return ships;
      });
      const slotitems = createSlotitemsByIds(state, [316, 473]);
      console.log(JSON.stringify(slotitems));
      deckShips.push([
        {
          ship_id: 1,
          lv: 10,
          hp: 20,
          maxhp: 30,
          cond: 50,
          slotitems,
        },
      ]);
      return deckShips;
    },
  }),
};
