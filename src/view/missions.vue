<template>
<div>
  <div class="mdl-card__title mdl-color--primary mdl-color-text--primary-contrast">
    <h6 class="mdl-card__title-text">Mission</h6>
  </div>
  <table class="mdl-data-table mdl-cell mdl-cell--12-col">
    <thead>
      <tr>
        <th class="mdl-data-table__cell--non-numeric">Name</th>
        <th class="mdl-data-table__cell--non-numeric">Left</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="mission in missions">
        <td class="mdl-data-table__cell--non-numeric">{{ mission.name }}</td>
        <td>{{ mission.timeLeft }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>
<script src='./missions.ts'></script>
<style>
</style>
