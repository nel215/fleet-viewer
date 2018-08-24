import Vue from 'vue';
import { State, Deck } from '../store/types';

interface Mission {
  name: string;
  timeLeft: string;
}

function getDummyMission() {
  return <Mission>{
    name: '-',
    timeLeft: '-',
  };
}

function prepareMission(state: State, current, mission) {
  const m = state.master.missions[mission.id];
  if (m === undefined) {
    return getDummyMission();
  }
  return <Mission>{
    name: m.name,
    timeLeft: `${mission.end - current}`,
  };
}

function isPrimary(deck) {
  return deck.id === 1;
}

export default Vue.extend({
  data() {
    return {
      current: Date.now(),
      intervalId: null,
    };
  },
  mounted() {
    this.intervalId = setInterval(() => {
      this.current = Date.now();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  computed: {
    missions(): Array<Mission> {
      const { state } = this.$store;
      let decks: Array<Deck> = Object.values(state.decks);
      decks = decks.filter(d => !isPrimary(d));
      const missions = decks.map(deck => prepareMission(state, this.current, deck.mission));
      while (missions.length < 3) {
        missions.push(getDummyMission());
      }
      return missions;
    },
  },
});
