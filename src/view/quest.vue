<template>
<div>
  <div class="mdl-card__title mdl-color--primary mdl-color-text--primary-contrast">
    <h6 class="mdl-card__title-text">Mission</h6>
  </div>
  <div class= "mdl-card__supporting-text">
    <table class="mdl-data-table">
      <thead>
        <th class="mdl-data-table__cell--non-numeric">Title</th>
      </thead>
      <tr v-for="quest in selectedQuests">
        <td class="mdl-data-table__cell--non-numeric">{{ quest.title }}</td>
      </tr>
    </table>
  </div>
</div>
</template>
<script src='./quest.ts'></script>
<style>
</style>
