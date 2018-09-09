import { mapState } from 'vuex';
import { State } from '../store/types';

export default {
  computed: mapState({
    message(state: State) {
      console.log(JSON.parse(JSON.stringify(state)));
      if (state.message.text === '') {
        return {
          active: 'none',
          text: '',
        };
      }
      return {
        active: 'active',
        text: state.message.text,
      };
    },
  }),
};
