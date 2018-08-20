<template>
<div>
  <div class="mdl-card__title">
    <h6 class="mdl-card__title-text">Fleets</h6>
  </div>
  <ship class="mdl-card__supporting-text" v-for="deck in decks" :key="deck.id" :deck-id="deck.id"></ship>
</div>
</template>
<script src='./ships-list.ts'>
</script>
<style>
</style>
