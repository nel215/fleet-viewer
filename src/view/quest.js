import Vuex from 'vuex';

function isSelected(quest) {
  return quest.state === 2 || quest.state === 3;
}

export default {
  computed: Vuex.mapState({
    selectedQuests(state) {
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
