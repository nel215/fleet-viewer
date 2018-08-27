import Vue from 'vue';
import ShipView from './ship.vue';
import { SlotitemMaster, ShipMaster, ItemType } from '../store/types';

function getAirBonus(minorType, airLevel): number {
  let bonus = [0, 1, 1, 2, 2, 2, 2, 3][airLevel];
  if ([ItemType.Fighter, ItemType.SeaplaneFighter].some(d => d === minorType)) {
    bonus += [0, 0, 2, 5, 9, 14, 14, 22][airLevel];
  }
  if (minorType === ItemType.SeaplaneBomber) {
    bonus += [0, 0, 1, 1, 1, 3, 3, 6][airLevel];
  }
  return bonus;
}

function getImprovementBonus(itemType, itemLevel) {
  if ([ItemType.Fighter, ItemType.SeaplaneFighter].some(d => d === itemType)) {
    return 0.2 * itemLevel;
  }
  if (itemType === ItemType.DiveBomber) {
    return 0.25 * itemLevel;
  }
  return 0;
}

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
          const improvementBonus = getImprovementBonus(slotitemMaster.type, slotitem.level);
          let power = (antiair + improvementBonus) * Math.sqrt(space);
          power += getAirBonus(slotitemMaster.type, slotitem.airLevel);
          return Math.floor(power);
        });
        return shipPowers.reduce((res, p) => res + p, 0);
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
