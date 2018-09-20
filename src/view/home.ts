import Vue from 'vue';
import QuestView from './quest.vue';
import Decks from './decks.vue';
import MissionsView from './missions.vue';
import MessageView from './message.vue';

export default Vue.extend({
  components: {
    quest: QuestView,
    decks: Decks,
    missions: MissionsView,
    message: MessageView,
  },
});
