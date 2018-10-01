import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import { State } from './types';
import { Quest } from '../entity';
import getSelectedQuests from '../usecase/quest';
import getUnclearedEventMaps from '../usecase/map';
import APIMap from '../api/map';
import API from '../api';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: <State>{
    master: {
      ships: {},
      slotitems: {},
      missions: {},
    },
    ships: {},
    slotitems: {},
    decks: {},
    quests: {},
    maps: {},
    airBases: {},
    message: {
      text: '',
    },
  },
  getters: {
    selectedQuests: state => getSelectedQuests(state.quests),
    maps: state => APIMap.merge(state.maps, state.master.maps),
    ships: state => API.mergeShips(state.ships, state.slotitems, state.master),
    getShipById: (state, getters) => id => getters.ships[id],
    decks: state => API.mergeDecks(state.decks, state.master),
    unclearedEventMaps: (state, getters) => getUnclearedEventMaps(getters.maps),
  },
  mutations: {
    updateMaster(state, payload) {
      Object.entries(payload.master).forEach(([key, value]) => {
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
    updateMessage(state: State, payload) {
      Vue.set(state, 'message', payload.message);
    },
    updateMaps(state, payload) {
      payload.maps.forEach((map) => {
        Vue.set(state.maps, map.id, map);
      });
    },
    updateAirBases(state, payload) {
      payload.airBases.forEach((b) => {
        console.log(JSON.parse(JSON.stringify(b)));
        Vue.set(state.airBases, b.id, b.bases);
      });
    },
  },
  actions,
});

export default store;
