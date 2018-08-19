import Vuex from 'vuex';

export default {
  data() {
    return {};
  },
  computed: Vuex.mapState({
    deckShips(state) {
      const deckShips = Object.values(state.decks).map((deck) => {
        const ships = [];
        deck.ship_ids.forEach((shipId) => {
          if (shipId === -1) {
            return;
          }
          ships.push(state.ships[shipId]);
        });
        return ships;
      });
      return deckShips;
    },
  }),
};
