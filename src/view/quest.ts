import Vue from 'vue';
import { mapState } from 'vuex';
import { State } from '../store/types';
import { Quest, QuestCategory } from '../entity';

interface QuestViewModel {
  title: string;
  color: string;
}

function createDummy(): QuestViewModel {
  return {
    title: '-',
    color: 'mdl-color--grey-400 mdl-color-text--white',
  };
}

function getColor(quest: Quest): string {
  const c = {
    [QuestCategory.Composition]: 'teal-600',
    [QuestCategory.Sortie]: 'red-600',
    [QuestCategory.ExtraSortie]: 'red-600',
    [QuestCategory.Exercise]: 'light_green-700',
    [QuestCategory.Expedition]: 'blue-600',
    [QuestCategory.Supply]: 'yellow-800',
    [QuestCategory.Arsenal]: 'brown-600',
    [QuestCategory.Modernization]: 'purple-600',
  }[quest.category];
  if (c !== undefined) {
    return `mdl-color--${c} mdl-color-text--white`;
  }
  return 'mdl-color--grey-400 mdl-color-text--white';
}

export default Vue.extend({
  computed: {
    selectedQuests(): Array<QuestViewModel> {
      const selected = this.$store.getters.selectedQuests.map(quest => ({
        title: quest.title,
        color: getColor(quest),
      }));

      while (selected.length < 6) {
        selected.push(createDummy());
      }
      console.log(selected);
      return selected;
    },
  },
});
