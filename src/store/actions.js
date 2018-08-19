import uuid from 'uuid/v4';
import API from '../api';

export default {
  connect(context) {
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
