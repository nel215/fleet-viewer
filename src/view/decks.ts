import Vue from 'vue';
import { mapState } from 'vuex';
import ShipView from './ship.vue';
import { State } from '../store/types';

export default Vue.extend({
  data() {
    return {
      selected: 1,
    };
  },
  components: {
    ship: ShipView,
  },
  computed: mapState({
    decks(state: State) {
      const decks = Object.values(state.decks).map((deck: any) => ({
        id: deck.id,
      }));
      while (decks.length < 4) {
        // Set dummy
        decks.push({ id: 1 + decks.length });
      }
      return decks;
    },
  }),
});
