<template>
  <div class="container-fluid sticky-top px-0">
    <nav class="navbar navbar-expand-lg navbar-secondary bg-secondary">
      <div class="container">
          <router-link tag="a" class="navbar-brand text-light" :to="'/'">
            TokoFlix
          </router-link>
        <a class="navbar-brand text-light" href="/"></a>
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
