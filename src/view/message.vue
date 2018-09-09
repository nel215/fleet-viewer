<template>
<div :class="`mdl-snackbar mdl-snackbar--${message.active}`">
  <div class="mdl-snackbar__text">{{ message.text }}</div>
</div>
</template>
<script src="./message.ts"></script>
