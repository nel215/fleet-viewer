<template>
  <ul>
    <li v-for="quest in questStore.state.quests">
      {{ quest.title }}
    </li>
  </ul>
</template>
<script src='./quest.js'></script>
<style>
</style>
