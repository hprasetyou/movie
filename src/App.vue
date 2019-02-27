<template>
  <div id="app">
    <layout-header />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import layoutHeader from './components/layout/Header.vue'
  export default {
    name: 'app',
    components: {
      'layout-header': layoutHeader
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }

</script>
