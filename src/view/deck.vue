<template>
<table class="mdl-data-table">
  <thead>
    <tr>
      <th class="mdl-data-table__cell--non-numeric">Name</th>
      <th class="mdl-data-table__cell--non-numeric">LV</th>
      <th class="mdl-data-table__cell--non-numeric">HP</th>
      <th class="mdl-data-table__cell--non-numeric">Cond</th>
      <th class="mdl-data-table__cell--non-numeric">Bullet</th>
      <th class="mdl-data-table__cell--non-numeric">Item</th>
    </tr>
  </thead>
  <tbody>
    <ship v-for="(shipId, idx) in shipIds" :ship-id="shipId" :key="idx"></ship>
  </tbody>
  {{ airPower }}
</table>
</template>
<script src='./deck.ts'>
</script>
<style>
</style>
