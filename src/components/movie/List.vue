<template>
  <div class="row">
    <div class="section col-lg-9">
      <div class="section--title my-lg-3 py-lg-3 border-bottom">
        <div class="pagination float-right">
          <button class="btn" v-on:click="goToPage(-1)"> <font-awesome-icon icon="chevron-left" /> </button>
          <button class="btn" v-on:click="goToPage(1)"> <font-awesome-icon icon="chevron-right" />  </button>
        </div>
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
        <div v-for="(movie, key) in collections" class="mb-2" :key="key">
          <movie-item :showPrice="false" :showRating="false" :title="movie.title" :display="'list'" :slug="movie.slug" :cover="movie.cover" :date="movie.date" :rating="movie.rating" />
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
        title:'Now Playing',
        listMode:'movie/now_playing'
      }
    },
    methods: {
      getMovies(page=1,params='&region=ID') {
        axios.get(`${conf.ApiUrl}${this.listMode}?api_key=${conf.ClientKey}${params}&page=${page}`).then((
          response) => {
          let movies = response.data.results;
          this.movies = this.transformCollections(movies)

        }).catch(function (error) {
          // handle error
          console.log(error);
        })
      },
      goToPage(x){
        let query = _.clone(this.$route.query);
        if(query.page == undefined){
          query.page = 1
        }
        query.page = parseInt(query.page)+x;
        if(query.page < 1){
          query.page = 1
        } 
            
        this.$router.push({ path: '', query: query})
      },
      getNowPlaying(page){
        this.title = 'Now Playing';
        this.listMode = 'movie/now_playing';
        this.getMovies(page);
      },
      searchMovie(page,query){
        this.title = `Search result for ${query}`;
        this.listMode = 'search/movie';
        let params = `&query=${query}`;
        this.getMovies(page,params);
      },
      transformCollections(movies){
         return _.map(movies, function (movie) {
            return {
              title: movie.title,
              slug: movie.id + '-' + movie.title.toLowerCase().replace(/\s+/g, '-'),
              cover: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              date: movie.release_date,
              rating: movie.vote_average
            }
          })
      },
      loadPage(){
        let page = 1;
        if(this.$route.query.page){
          page = this.$route.query.page;
        }
        if(this.$route.query.search){
          this.searchMovie(page,this.$route.query.search)
        }else{
          this.getNowPlaying(page);
        }
        
      }
    },
    mounted() {
      this.loadPage();
    },
    watch:{
      $route (to, from){
          this.loadPage();
      }
    } 
  }

</script>
