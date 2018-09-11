<template>
<div>
  <div class="mdl-card__title">
    <h6 class="mdl-card__title-text">Quest</h6>
  </div>
  <table class="mdl-data-table mdl-cell mdl-cell--12-col">
    <thead>
      <th class="mdl-data-table__cell--non-numeric">Title</th>
    </thead>
    <tr v-for="quest in selectedQuests">
      <td class="mdl-data-table__cell--non-numeric">
        <span :class="`box-200 ${quest.color}`">{{ quest.title }}</span>
      </td>
    </tr>
  </table>
</div>
</template>
<script src='./quest.ts'></script>
<style>
</style>
