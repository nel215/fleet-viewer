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
  fetchMaster(context) {
    console.log('fetchMaster');
    browser.storage.local.get('master').then(
      (payload) => {
        const master = API.parseMaster(payload.master);
        context.commit('updateMaster', { master });
        context.dispatch('connect');
      },
      (err) => {
        console.log(err);
        // TODO: display error message
      },
    );
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
