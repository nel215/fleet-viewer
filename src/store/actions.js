import uuid from 'uuid/v4';
import API from '../api';

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
  handleRequreInfo(context) {
    console.log('require info');
    console.log(context);
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
        // context.dispatch('connect');
      })
      .catch((err) => {
        console.log(err);
        // TODO: display error message
      });
  },
  handlePort(context, payload) {
    context.commit('updateShips', { ships: payload.ships });
    context.commit('updateDecks', { decks: payload.decks });
  },
  handleShipDeck(context, payload) {
    context.commit('updateShips', { ships: payload.ships });
  },
  handleQuestList(context, payload) {
    context.commit('updateQuests', { quests: payload.quests });
  },
};
