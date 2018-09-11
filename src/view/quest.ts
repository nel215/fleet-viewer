import { mapState } from 'vuex';
import { State, Quest, QuestCategory } from '../store/types';

function isSelected(quest) {
  return quest.state === 2 || quest.state === 3;
}

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
  if (quest.category === QuestCategory.Sally) {
    return 'mdl-color--red-600 mdl-color-text--white';
  }
  if (quest.category === QuestCategory.Expedition) {
    return 'mdl-color--blue-600 mdl-color-text--white';
  }
  return 'mdl-color--grey-400 mdl-color-text--white';
}

export default {
  computed: mapState({
    selectedQuests(state: State) {
      const selected: Array<QuestViewModel> = [];
      Object.values(state.quests).forEach((quest) => {
        if (!isSelected(quest)) {
          return;
        }
        selected.push({
          title: quest.title,
          color: getColor(quest),
        });
      });
      while (selected.length < 6) {
        selected.push(createDummy());
      }
      console.log(selected);
      return selected;
    },
  }),
};
