<template>
<tr>
  <td class="mdl-data-table__cell--non-numeric">{{ ship.name }}</td>
  <td>{{ ship.lv }}</td>
  <td><span :class="`circle ${getHpColorClass(ship)}`"></span>{{ ship.hp }}/{{ ship.maxhp }}</td>
  <td>{{ ship.cond }}</td>
  <td><span :class="`box ${getFuelOrBulletColor(ship.fuel, ship.maxFuel)}`">{{ ship.fuelPercentage }}</span></td>
  <td><span :class="`box ${getFuelOrBulletColor(ship.bullet, ship.maxBullet)}`">{{ ship.bulletPercentage }}</span></td>
  <td>
    <span class='icon' v-for="slotitem in ship.slotitems" :id="slotitem.id" >
      {{ slotitem.shortName }}
      <mdl-tooltip :target="slotitem.id">{{ slotitem.name }}</mdl-tooltip>
    </span>
  </td>
</tr>
</template>
<script src='./ship.ts'>
</script>
<style>
</style>
