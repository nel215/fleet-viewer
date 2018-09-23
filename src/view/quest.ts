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
  if (quest.category === QuestCategory.Composition) {
    return 'mdl-color--teal-600 mdl-color-text--white';
  }
  if (quest.category === QuestCategory.Sortie || quest.category === QuestCategory.ExtraSortie) {
    return 'mdl-color--red-600 mdl-color-text--white';
  }
  if (quest.category === QuestCategory.Exercise) {
    return 'mdl-color-light_green-700 mdl-color-text--white';
  }
  if (quest.category === QuestCategory.Expedition) {
    return 'mdl-color--blue-600 mdl-color-text--white';
  }
  if (quest.category === QuestCategory.Supply) {
    return 'mdl-color--yellow-800 mdl-color-text--white';
  }
  if (quest.category === QuestCategory.Arsenal) {
    return 'mdl-color--brown-600 mdl-color-text--white';
  }
  if (quest.category === QuestCategory.Modernization) {
    return 'mdl-color--purple-600 mdl-color-text--white';
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
