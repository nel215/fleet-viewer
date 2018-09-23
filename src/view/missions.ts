import Vue from 'vue';
import { State } from '../store/types';

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

function pad(num, length) {
  return num.toString().padStart(length, '0');
}

function prepareMission(current, mission): Mission {
  if (mission === null) {
    return getDummyMission();
  }
  let seconds = Math.max(0, (mission.end - current) / 1000);
  const hours = Math.floor(seconds / 60 / 60);
  seconds -= hours * 60 * 60;
  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  seconds = Math.floor(seconds);
  return <Mission>{
    name: mission.name,
    timeLeft: `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`,
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
      let { decks } = this.$store.getters;
      decks = decks.filter(d => !isPrimary(d));
      const missions = decks.map(deck => prepareMission(this.current, deck.mission));
      while (missions.length < 3) {
        missions.push(getDummyMission());
      }
      return missions;
    },
  },
});
