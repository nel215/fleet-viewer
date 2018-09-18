import Vue from 'vue';
import { mapState } from 'vuex';
import { State } from '../store/types';

export default Vue.extend({
  data() {
    return {
      selected: 1,
    };
  },
  computed: mapState({
    contents(state: State) {
      return [{ id: 1 }, { id: 2 }];
    },
  }),
});
