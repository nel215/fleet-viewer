<template>
<div>
  <div class="mdl-card__title mdl-color--primary mdl-color-text--primary-contrast">
    <h6 class="mdl-card__title-text">Fleets</h6>
  </div>
  <mdl-tabs v-model="selected">
    <mdl-tab v-for="deck in decks" :key="deck.id" :tab="{id: deck.id, title: `Deck ${deck.id}`}">
      <ship class="mdl-cell mdl-cell--12-col" :deck-id="deck.id"></ship>
    </mdl-tab>
  </mdl-tabs>
</div>
</template>
<script src='./decks.ts'>
</script>
<style>
</style>
