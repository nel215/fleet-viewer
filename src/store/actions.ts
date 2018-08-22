import Vue from 'vue';
import uuid from 'uuid/v4';
import API from '../api';

declare let browser: any;

export default {
  connect(context) {
    console.log('connect');
    const port = browser.runtime.connect({
      name: uuid(),
    });
    port.onMessage.addListener((message) => {
      const action = API.createAction(message);
      if (action === null) {
        return;
      }
      context.dispatch(action);
    });
  },
  handleGetData(context, payload) {
    console.log('get data');
    context.commit('updateMaster', { master: payload.master });
  },
  handleRequreInfo(context, payload) {
    console.log('require info');
    context.commit('updateSlotitems', { slotitems: payload.slotitems });
  },
  initialize(context) {
    console.log('initialize');
    browser.storage.local
      .get('/kcsapi/api_start2/getData')
      .then((payload) => {
        const action = API.createAction(payload['/kcsapi/api_start2/getData']);
        context.dispatch(action);
        return browser.storage.local.get('/kcsapi/api_get_member/require_info');
      })
      .then((payload) => {
        const action = API.createAction(payload['/kcsapi/api_get_member/require_info']);
        context.dispatch(action);
        context.dispatch('connect');
      })
      .catch((err) => {
        console.log(err);
        // TODO: display error message
      });
  },
  handlePort(context, payload) {
    console.log('port');
    context.commit('updateShips', { ships: payload.ships });
    context.commit('updateDecks', { decks: payload.decks });
  },
  handleShip3(context, payload) {
    console.log('ship3');
    context.commit('updateShips', { ships: payload.ships });
    context.commit('updateDecks', { decks: payload.decks });
  },
  handleShipDeck(context, payload) {
    context.commit('updateShips', { ships: payload.ships });
  },
  handleQuestList(context, payload) {
    context.commit('updateQuests', payload);
  },
  handleDeck(context, payload) {
    console.log('deck');
    context.commit('updateDecks', { decks: payload.decks });
  },
};
