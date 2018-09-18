import QuestView from './quest.vue';
import Decks from './decks.vue';
import MissionsView from './missions.vue';
import MessageView from './message.vue';
import HeaderView from './header.vue';

const AppView = {
  components: {
    Header: HeaderView,
    quest: QuestView,
    decks: Decks,
    missions: MissionsView,
    message: MessageView,
  },
};

export default AppView;
