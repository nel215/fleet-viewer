import Vue from 'vue';
import ShipView from './ship.vue';

export default Vue.extend({
  props: {
    deckId: Number,
  },
  components: {
    ship: ShipView,
  },
  computed: {
    shipIds(): Array<number> {
      const { state } = this.$store;
      if (!(this.deckId in state.decks)) {
        return [-1, -1, -1, -1, -1, -1, -1];
      }
      const deck = state.decks[this.deckId];
      return deck.shipIds;
    },
  },
});
