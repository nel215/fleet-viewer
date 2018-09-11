import { mapState } from 'vuex';
import { State } from '../store/types';

function isSelected(quest) {
  return quest.state === 2 || quest.state === 3;
}

interface Quest {
  title: string;
}

function createDummy(): Quest {
  return {
    title: '-',
  };
}

export default {
  computed: mapState({
    selectedQuests(state: State) {
      const selected: Array<Quest> = [];
      Object.values(state.quests).forEach((quest) => {
        if (!isSelected(quest)) {
          return;
        }
        selected.push(quest);
      });
      while (selected.length < 6) {
        selected.push(createDummy());
      }
      console.log(selected);
      return selected;
    },
  }),
};
