<template>
  <div class="row">
    <div class="section col-lg-9">
      <div class="section--title my-lg-3 py-lg-3 border-bottom">
        <h3 class="my-lg-0">{{ title }}</h3>
      </div>
      <div class="movie-list row mx-md-0">
        <div :class="['col-md-3','px-md-2','mb-sm-3']" v-for="(movie, key) in movies" :key="key">
          <movie-item :title="movie.title" :slug="movie.slug" :cover="movie.cover" :date="movie.date" :rating="movie.rating" />
        </div>
      </div>
    </div>
    <div class="section mycollections col-lg-3">
      <div class="section--title my-lg-3 py-lg-3 border-bottom">
        <h3 class="my-lg-0">My Collections</h3>
      </div>
      <div class="movie-list row mx-md-0">
        <div v-for="(movie, key) in collections" :key="key">
          <movie-item :title="movie.title" :display="'list'" :slug="movie.slug" :cover="movie.cover" :date="movie.date" :rating="movie.rating" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import movieListItem from './ListItem.vue';
  import axios from 'axios';
  import _ from 'lodash';
  import * as conf from '../../config.js';
  import { collectionsMixins } from '../../collectionsMixins.js';

  export default {
    components: {
      'movie-item': movieListItem
    },
    mixins:[collectionsMixins],
    data() {
      return {
        movies: [],
        page:1,
        title:'Now Playing'
      }
    },
    methods: {
      getMovies(page) {
        axios.get(`${conf.ApiUrl}/now_playing?api_key=${conf.ClientKey}&region=ID&page=${page}`).then((
          response) => {
          let movies = response.data.results;
          this.movies = _.map(movies, function (movie) {
            return {
              title: movie.title,
              slug: movie.id + '-' + movie.title.toLowerCase().replace(/\s+/g, '-'),
              cover: 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
              date: movie.release_date,
              rating: movie.vote_average
            }
          })

        }).catch(function (error) {
          // handle error
          console.log(error);
        })
      }
    },
    mounted() {
      if(this.$route.query.page){
        this.page = this.$route.query.page;
      }
      console.log(this.collections);
      
      this.getMovies(this.page);
    }
  }

</script>
