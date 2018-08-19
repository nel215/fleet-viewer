<template>
  <div>
    <div v-for="deck in deckShips">
      <ul>
        <li v-for="ship in deck">
          {{ ship.ship_id }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script src='./ship.js'>
</script>
<style>
</style>
