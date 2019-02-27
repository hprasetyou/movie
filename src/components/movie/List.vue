<template>
  <div>
    <h1>Movie list</h1>
    <div class="movie-list row mx-md-0">
      <div :class="['col-md-3','px-md-2','mb-sm-3']" v-for="(movie, key) in movies" :key="key">
        <movieItem :title="movie.title" :slug="movie.slug" :cover="movie.cover" :year="movie.year" />
      </div>
    </div>
  </div>
</template>
<script>
  import movieListItem from './ListItem.vue';
  import axios from 'axios';
  import _ from 'lodash';
  import * as conf from '../../config.js';

  export default {
    components: {
      'movieItem': movieListItem
    },
    data() {
      return {
        movies: []
      }
    },
    mounted() {
      axios.get(`${conf.ApiUrl}/now_playing?api_key=${conf.ClientKey}&region=ID`).then((
        response) => {
        let movies = response.data.results;
        this.movies = _.map(movies, function(movie){
            return {
                title: movie.title,
                slug: movie.id + '-' + movie.title.toLowerCase().replace(' ','-'),
                cover: 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
                date: movie.release_date
            }
        })
        
      }).catch(function (error) {
        // handle error
        console.log(error);
      })
    }
  }

</script>
