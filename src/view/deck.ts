import Vue from 'vue';
import ShipView from './ship.vue';
import { SlotitemMaster, ShipMaster } from '../store/types';

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
    airPower(): number {
      console.log('airPower', this.deckId);
      const { state } = this.$store;
      if (!(this.deckId in state.decks)) {
        return 0;
      }
      const deck = state.decks[this.deckId];
      const powers = deck.shipIds.map((shipId) => {
        if (!(shipId in state.ships)) {
          return 0;
        }
        const ship = state.ships[shipId];
        if (!(ship.shipId in state.master.ships)) {
          return 0;
        }
        const shipMaster = state.master.ships[ship.shipId];
        const shipPowers = ship.slot.map((slotitemId, idx) => {
          if (!(slotitemId in state.slotitems)) {
            return 0;
          }
          const slotitem = state.slotitems[slotitemId];
          if (!(slotitem.slotitemId in state.master.slotitems)) {
            return 0;
          }
          const slotitemMaster = state.master.slotitems[slotitem.slotitemId];
          if (!slotitemMaster.isAirPower) {
            return 0;
          }
          const space = shipMaster.maxSpaces[idx];
          const antiair = slotitemMaster.tyku;
          return Math.floor(antiair * Math.sqrt(space)); // TODO: plus
        });
        console.log(shipId, shipPowers);
        return shipPowers.reduce((res, p) => res + p, 0);
      });
      console.log(powers);
      return powers.reduce((res, p) => res + p, 0);
    },
  },
});
