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
  initialize(context) {
    console.log('initialize');
    context.dispatch('connect');
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
      })
      .catch((err) => {
        console.log(err);
        const text = 'There is no data. Please reload the game';
        context.dispatch('handleMessage', { message: { text } });
      });
  },
  update(context, payload) {
    console.log('update');
    if (payload.master !== undefined) {
      context.commit('updateMaster', { master: payload.master });
    }
    if (payload.slotitems !== undefined) {
      context.commit('updateSlotitems', { slotitems: payload.slotitems });
    }
    if (payload.ships !== undefined) {
      context.commit('updateShips', { ships: payload.ships });
    }
    if (payload.decks !== undefined) {
      context.commit('updateDecks', { decks: payload.decks });
    }
    if (payload.quests !== undefined) {
      context.commit('updateQuests', { quests: payload.quests });
    }
  },
  handleMessage(context, payload) {
    context.commit('updateMessage', { message: payload.message });
    setTimeout(() => {
      context.commit('updateMessage', { message: { text: '' } });
    }, 5000);
  },
};
