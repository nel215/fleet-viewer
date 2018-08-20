import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import State from './state';
import { Quest, QuestlistPayload } from './types';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: <State>{
    master: {
      ships: {},
      slotitems: {},
    },
    ships: {},
    slotitems: {},
    decks: {},
    quests: {},
  },
  mutations: {
    updateMaster(state, payload) {
      Object.entries(payload.master).forEach(([key, value]) => {
        console.log(key, JSON.parse(JSON.stringify(value)));
        Vue.set(state.master, key, value);
      });
    },
    updateShips(state, payload) {
      payload.ships.forEach((ship) => {
        Vue.set(state.ships, ship.id, ship);
      });
    },
    updateSlotitems(state, payload) {
      payload.slotitems.forEach((slotitem) => {
        Vue.set(state.slotitems, slotitem.id, slotitem);
      });
    },
    updateDecks(state, payload) {
      payload.decks.forEach((deck) => {
        Vue.set(state.decks, deck.id, deck);
      });
    },
    updateQuests(state, payload) {
      Object.values(state.quests).forEach((quest: Quest) => {
        if (quest.page !== payload.page) {
          return;
        }
        Vue.delete(state.quests, quest.id);
      });
      payload.quests.forEach((quest) => {
        Vue.set(state.quests, quest.id, quest);
      });
    },
  },
  actions,
});

export default store;
