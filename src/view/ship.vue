<template>
<tr>
  <td>{{ ship.name }}</td>
  <td>{{ ship.lv }}</td>
  <td><span :class="`circle ${getHpColorClass(ship)}`"></span>{{ ship.hp }}/{{ ship.maxhp }}</td>
  <td>{{ ship.cond }}</td>
  <td><span :class="`circle ${getBulletColorClass(ship)}`"></span></td>
  <td>
    <span class='icon' v-for="(slotitem, idx) in ship.slotitems" :id="idx" >
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
