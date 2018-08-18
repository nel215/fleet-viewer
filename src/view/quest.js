import QuestStore from '../store/quest';

function isSelected(quest) {
  return quest.state === 2;
}

export default {
  data: function() {
    return {
      quests: QuestStore.quests,
    };
  },
  computed: {
    selectedQuests: function() {
      const selected = [];
      console.log(this.quests);
      for (const id in this.quests) {
        if (!isSelected(this.quests[id])) {
          continue;
        }
        selected.push(this.quests[id]);
      }
      return selected;
    }
  }
}
