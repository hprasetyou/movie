<template>
  <div class="container-fluid sticky-top px-0">
    <nav class="navbar navbar-expand-lg navbar-secondary bg-secondary">
      <div class="container">
        <a class="navbar-brand text-light" href="/">TokoFlix</a>
        <span class="navbar-nav ml-auto text-light">Balance: {{ getBalance() }}</span>
      </div>
    </nav>
  </div>
</template>
<script>
import { balanceMixins } from '../../balanceMixins.js';
export default {
  mixins: [balanceMixins]
}
</script>
