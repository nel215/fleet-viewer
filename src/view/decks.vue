<template>
<mdl-tabs v-model="selected">
  <mdl-tab v-for="deck in decks" :key="deck.id" :tab="{id: deck.id, title: `Deck ${deck.id}`}">
    <ship class="mdl-cell mdl-cell--12-col" :deck-id="deck.id"></ship>
  </mdl-tab>
</mdl-tabs>
</template>
<script src='./decks.ts'>
</script>
<style>
</style>
