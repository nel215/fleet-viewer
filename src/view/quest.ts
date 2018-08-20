import { mapState } from 'vuex';
import State from '../store/state';

function isSelected(quest) {
  return quest.state === 2 || quest.state === 3;
}

export default {
  computed: mapState({
    selectedQuests(state: State) {
      const selected = [];
      Object.values(state.quests).forEach((quest) => {
        if (!isSelected(quest)) {
          return;
        }
        selected.push(quest);
      });
      while (selected.length < 6) {
        selected.push({
          title: '-',
        });
      }
      console.log(selected);
      return selected;
    },
  }),
};
