<template>
<div>
  <mdl-tabs v-model="selected">
    <mdl-tab v-for="deck in decks" :key="deck.id" :tab="{id: deck.id, title: `Deck ${deck.id}`}">
      <deck class="mdl-cell mdl-cell--12-col" :deck-id="deck.id"></deck>
    </mdl-tab>
  </mdl-tabs>
</div>
</template>
<script src='./decks.ts'>
</script>
<style>
</style>
