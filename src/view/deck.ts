import Vue from 'vue';
import ShipView from './ship.vue';
import { SlotitemMaster, ShipMaster, ItemType } from '../store/types';

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
      const { state, getters } = this.$store;
      if (!(this.deckId in state.decks)) {
        return 0;
      }
      const deck = state.decks[this.deckId];
      const powers = deck.shipIds.map((shipId) => {
        if (!(shipId in state.ships)) {
          return 0;
        }
        const ship = getters.getShipById(shipId);
        if (!ship) {
          return 0;
        }
        return ship.slotitems.reduce((res, s) => res + s.airPower, 0);
      });
      return powers.reduce((res, p) => res + p, 0);
    },
    los(): string {
      const { state } = this.$store;
      if (!(this.deckId in state.decks)) {
        return '0.00';
      }
      const deck = state.decks[this.deckId];
      const shipIds = deck.shipIds.filter(shipId => shipId in state.ships);
      const ships = shipIds.map(shipId => state.ships[shipId]);
      const slotitemLos = ships.map((ship) => {
        const itemLos = ship.slot.map((slotitemId) => {
          if (!(slotitemId in state.slotitems)) {
            return 0;
          }
          const slotitem = state.slotitems[slotitemId];
          if (!(slotitem.slotitemId in state.master.slotitems)) {
            return 0;
          }
          const slotitemMaster = state.master.slotitems[slotitem.slotitemId];
          return 0.6 * slotitemMaster.los; // TODO: coefficient
        });
        return itemLos.reduce((res, los) => res + los, 0);
      });

      let los = 0;
      los += ships.reduce((res, ship) => res + Math.sqrt(ship.los), 0);
      los += slotitemLos.reduce((res, slos) => res + slos, 0);
      los -= Math.floor(0.4 * 120); // TODO
      los += 2 * (6 - ships.length);
      return los.toFixed(2);
    },
  },
});
