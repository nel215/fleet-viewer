import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    ships: {},
    decks: {},
  },
  mutations: {
    updateShips(state, payload) {
      for (const ship of payload.ships) {
        Vue.set(state.ships, ship.id, ship);
      }
    },
    updateDecks(state, payload) {
      for (const deck of payload.decks) {
        Vue.set(state.decks, deck.id, deck);
      }
    },
  },
  actions,
});

export default store;
