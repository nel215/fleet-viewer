<template>
<main class="mdl-layout__content mdl-color--grey-100">
  <div class="mdl-grid">
    <div class="mdl-card mdl-cell mdl-cell--8-col mdl-cell--4-col-phone mdl-shadow--2dp">
      <div class="mdl-card__title">
        <h6 class="mdl-card__title-text">Map</h6>
      </div>
      <table class="mdl-data-table mdl-cell mdl-cell--12-col">
        <thead>
          <th class="mdl-data-table__cell--non-numeric">Title</th>
        </thead>
        <tr v-for="map in maps">
          <td class="mdl-data-table__cell--non-numeric">
            <span>{{ map.nowHp }}/{{ map.maxHp }}</span>
          </td>
        </tr>
      </table>
    </div>

  </div>
</main>
</template>
<script src="./sally.ts"></script>
<style>
</style>

