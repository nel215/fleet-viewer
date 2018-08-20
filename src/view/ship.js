import Vuex from 'vuex';

function parseMasterSlotitem(masterSlotitem) {
  return {
    name: masterSlotitem.name,
    shortName: masterSlotitem.name.substr(0, 1),
  };
}

export default {
  data() {
    return {};
  },
  computed: Vuex.mapState({
    deckShips(state) {
      const masterSlotitems = state.master.slotitems;
      if (masterSlotitems === undefined) {
        return [];
      }
      const deckShips = Object.values(state.decks).map((deck) => {
        const ships = [];
        deck.ship_ids.forEach((shipId) => {
          if (shipId === -1) {
            return;
          }
          const ship = state.ships[shipId];
          // TODO: Fix below
          const slotitems = ship.slot.map(id => parseMasterSlotitem(masterSlotitems[id]));
          Object.assign(ship, { slotitems });
          ships.push(ship);
        });
        return ships;
      });
      deckShips.push([
        {
          ship_id: 1,
          lv: 10,
          hp: 20,
          maxhp: 30,
          cond: 50,
          slotitems: [
            parseMasterSlotitem(masterSlotitems[1]),
            parseMasterSlotitem(masterSlotitems[2]),
          ],
        },
      ]);
      return deckShips;
    },
  }),
};
