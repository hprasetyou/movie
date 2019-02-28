<template>
  <form class="form-inline">
    <div class="input-group">
      <input type="text" class="form-control" v-model="searchInput" placeholder="I want to watch..." 
        aria-describedby="button-addon2">
      <div class="input-group-append">
        <button class="btn btn-primary" v-on:click="submitForm" type="button" id="button-addon2">Search</button>
      </div>
    </div>
  </form>
</template>
<script>
  export default {
    data(){
        return{
            searchInput:''
        }
    },
    methods: {
      submitForm() {
        this.$router.push({ path: '', query: {search: this.searchInput }})
      }
    }
  }

</script>
