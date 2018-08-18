<template>
  <ul>
    <li v-for="quest in questStore.state.quests">
      {{ quest.title }}
    </li>
  </ul>
</template>
<script>
import QuestStore from '../store/quest';

export default {
  data: function() {
    return {
      questStore: QuestStore,
    };
  },
}
</script>
<style>
</style>
