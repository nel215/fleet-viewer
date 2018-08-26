<template>
<div>
  <table class="mdl-data-table full-width">
    <thead>
      <tr>
        <th class="mdl-data-table__cell--non-numeric">Name</th>
        <th class="mdl-data-table__cell--non-numeric">LV</th>
        <th class="mdl-data-table__cell--non-numeric">HP</th>
        <th class="mdl-data-table__cell--non-numeric">Cond</th>
        <th class="mdl-data-table__cell--non-numeric">Fuel</th>
        <th class="mdl-data-table__cell--non-numeric">Bullet</th>
        <th class="mdl-data-table__cell--non-numeric">Item</th>
      </tr>
    </thead>
    <tbody>
      <ship v-for="(shipId, idx) in shipIds" :ship-id="shipId" :key="idx"></ship>
    </tbody>
    <tfoot>
      <tr>
        <div class="table-cell">Aerial: {{ airPower }}</div>
      </tr>
    </tfoot>
  </table>
</div>
</template>
<script src='./deck.ts'>
</script>
<style>
</style>
