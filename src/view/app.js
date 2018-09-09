import QuestView from './quest.vue';
import Decks from './decks.vue';
import MissionsView from './missions.vue';
import MessageView from './message.vue';

const AppView = {
  components: {
    quest: QuestView,
    decks: Decks,
    missions: MissionsView,
    message: MessageView,
  },
};

export default AppView;
