import Vue from 'vue';

export default Vue.extend({
  computed: {
    maps(): Array<any> {
      const maps = this.$store.getters.unclearedEventMaps;
      console.log(JSON.parse(JSON.stringify(maps)));
      return maps;
    },
  },
});
