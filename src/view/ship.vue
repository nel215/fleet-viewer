<template>
<table class="mdl-data-table">
  <thead>
    <th class="mdl-data-table__cell--non-numeric">Name</th>
    <th class="mdl-data-table__cell--non-numeric">LV</th>
    <th class="mdl-data-table__cell--non-numeric">HP</th>
    <th class="mdl-data-table__cell--non-numeric">Cond</th>
    <th class="mdl-data-table__cell--non-numeric">Item</th>
  </thead>
  <tr v-for="ship in ships">
    <td>{{ ship.name }}</td>
    <td>{{ ship.lv }}</td>
    <td>{{ ship.hp }}/{{ ship.maxhp }}</td>
    <td>{{ ship.cond }}</td>
    <td>
      <span class='icon' v-for="slotitem in ship.slotitems" :id="slotitem.key" >
        {{ slotitem.shortName }}
        <mdl-tooltip :target="slotitem.key">{{ slotitem.name }}</mdl-tooltip>
      </span>
    </td>
  </tr>
</table>
</template>
<script src='./ship.ts'>
</script>
<style>
</style>
