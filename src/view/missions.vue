<template>
<div>
  <div class="mdl-card__title mdl-color--primary mdl-color-text--primary-contrast">
    <h6 class="mdl-card__title-text">Mission</h6>
  </div>
  <div class= "mdl-card__supporting-text">
    <div v-for="mission in missions">{{ mission.name }}</div>
  </div>
</div>
</template>
<script src='./missions.ts'></script>
<style>
</style>
