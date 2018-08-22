import Vue from 'vue';
import { mapState } from 'vuex';
import { State, Deck } from '../store/types';

function getMission(state: State, mission) {
  const m = state.master.missions[mission.id];
  if (m === undefined) {
    return {
      name: '-',
    };
  }
  return {
    name: m.name,
  };
}

function isPrimary(deck) {
  return deck.id === 1;
}

export default Vue.extend({
  computed: mapState({
    missions(state: State) {
      let decks: Array<Deck> = Object.values(state.decks);
      decks = decks.filter(d => !isPrimary(d));
      const missions = decks.map(deck => getMission(state, deck.mission));
      return missions;
    },
  }),
});
