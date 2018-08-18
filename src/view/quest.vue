<template>
  <ul>
    <li v-for="quest in selectedQuests">
      {{ quest.title }}
    </li>
  </ul>
</template>
<script src='./quest.js'></script>
<style>
</style>
