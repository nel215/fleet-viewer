<template>
<tr>
  <td class="mdl-data-table__cell--non-numeric">{{ ship.name }}</td>
  <td>{{ ship.lv }}</td>
  <td><span :class="`box-56 ${ship.hpColor}`">{{ ship.hp }}/{{ ship.maxHp }}</span></td>
  <td>{{ ship.cond }}</td>
  <td><span :class="`box-40 ${ship.fuelColor}`">{{ ship.fuelPercentage }}</span></td>
  <td><span :class="`box-40 ${ship.bulletColor}`">{{ ship.bulletPercentage }}</span></td>
  <td>
    <span class='icon' v-for="slotitem in ship.slotitems" :id="slotitem.id" >
      {{ slotitem.shortName }}
      <mdl-tooltip :target="slotitem.id">{{ slotitem.name }}</mdl-tooltip>
    </span>
    <span class='icon' :id="ship.exSlotitem.id" >{{ ship.exSlotitem.shortName }}
      <mdl-tooltip :target="ship.exSlotitem.id">{{ ship.exSlotitem.name }}</mdl-tooltip>
    </span>
  </td>
</tr>
</template>
<script src='./ship.ts'>
</script>
<style>
</style>
