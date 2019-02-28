<template>
  <div class="container-fluid sticky-top px-0">
    <nav class="navbar navbar-expand-lg navbar-secondary bg-secondary">
      <div class="container">
        <router-link tag="a" class="navbar-brand text-light" :to="'/'">
          TokoFlix
        </router-link>
        <search-form></search-form>
      </div>
    </nav>
  </div>
</template>
<script>
  import { balanceMixins } from '../../balanceMixins.js';
  import searchForm from './searchForm.vue';
  export default {
    components:{
      'search-form':searchForm
    },
    mixins: [balanceMixins]
  }

</script>
