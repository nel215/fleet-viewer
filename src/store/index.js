import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    master: {},
    ships: {},
    decks: {},
    quests: {},
  },
  mutations: {
    updateMaster(state, payload) {
      Object.entries(payload.master).forEach(([key, value]) => {
        console.log(key, value);
        Vue.set(state.master, key, value);
      });
    },
    updateShips(state, payload) {
      payload.ships.forEach((ship) => {
        Vue.set(state.ships, ship.id, ship);
      });
    },
    updateDecks(state, payload) {
      payload.decks.forEach((deck) => {
        Vue.set(state.decks, deck.id, deck);
      });
    },
    updateQuests(state, payload) {
      payload.quests.forEach((quest) => {
        Vue.set(state.quests, quest.id, quest);
      });
    },
  },
  actions,
});

export default store;
