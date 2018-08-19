import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function parseShip(data) {
  return {
    id: data.api_id,
    ship_id: data.api_ship_id,
    lv: data.api_lv,
    hp: data.api_nowhp,
    maxhp: data.api_maxhp,
    fuel: data.api_fuel,
    bull: data.api_bull,
    cond: data.api_cond,
    slot: data.api_slot,
  };
}

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
  actions: {
    handlePort(context, payload) {
      const ships = [];
      const decks = [];
      for (const d of payload.body.api_data.api_ship) {
        ships.push(parseShip(d));
      }
      for (const d of payload.body.api_data.api_deck_port) {
        decks.push({
          id: d.api_id,
          ship_ids: d.api_ship,
        });
      }
      context.commit('updateShips', { ships });
      context.commit('updateDecks', { decks });
    },
  },
});

export default store;
