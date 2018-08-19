<template>
<div>
  <div class="mdl-card__title">
    <h6 class="mdl-card__title-text">Fleets</h6>
  </div>
  <div class= "mdl-card__supporting-text" v-for="deck in deckShips">
    <table class="mdl-data-table">
      <thead>
        <th class="mdl-data-table__cell--non-numeric">Name</th>
        <th class="mdl-data-table__cell--non-numeric">LV</th>
        <th class="mdl-data-table__cell--non-numeric">HP</th>
        <th class="mdl-data-table__cell--non-numeric">Cond</th>
      </thead>
      <tr v-for="ship in deck">
        <td>{{ ship.ship_id }}</td>
        <td>{{ ship.lv }}</td>
        <td>{{ ship.hp }}/{{ ship.maxhp }}</td>
        <td>{{ ship.cond }}</td>
      </tr>
    </table>
  </div>
</div>
</template>
<script src='./ship.js'>
</script>
<style>
</style>
