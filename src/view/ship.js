import Vuex from 'vuex';

export default {
  data: function() {
    return {};
  },
  computed: Vuex.mapState({
    deckShips(state) {
      const deckShips = [];
      for (const deck_id in state.decks) {
        const deck = state.decks[deck_id];
        const ships = [];
        for (const ship_id of deck.ship_ids) {
          if (ship_id == -1) {
            continue;
          }
          ships.push(state.ships[ship_id]);
        }
        deckShips.push(ships);
      }
      return deckShips;
    },
  }),
}
