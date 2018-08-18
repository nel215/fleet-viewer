import QuestStore from '../store/quest';

export default {
  data: function() {
    return {
      quests: QuestStore.quests,
    };
  },
}
