<template>
  <div>
    <h4>this is detail page</h4>
    {{ $route.params.slug }}
  </div>
</template>
<script>
import axios from 'axios';
import * as conf from '../../config.js';
export default {
  data() {
    return {
      movie:{}
    }
  },
  mounted() {
    this.movie.id = this.$route.params.slug.split('-')[0];
    axios.get(`${conf.ApiUrl}/${this.movie.id}?api_key=${conf.ClientKey}`).then((
        response) => {
        let movies = response.data;
        console.log(movies);
        
        
    }).catch(function (error) {
        // handle error
        console.log(error);
    })
  },
}
</script>
