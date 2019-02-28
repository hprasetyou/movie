<template>
  <div>
    <div class="row">
      <div class="col-lg-4">
        <div class="movie-cover">
          <img :src="movie.cover" alt="">
          <p>Duration {{ movie.duration }}</p>
        </div>
      </div>
      <div class="col-lg-8">
          <div class="movie-title border-bottom">
            <h4>{{ movie.title }}</h4>    
            <star-rating v-model="movie.vote_average" :read-only="true" :increment="0.5" :star-size="15"></star-rating>
            <span>Language: {{ movie.languages }}</span>
          </div>
          <div class="movie-description mb-lg-4">
            <p>{{ movie.overview }}</p>
          </div>
          <div class="movie-info">
            <span>Genres: </span><span class="font-italic">{{ movie.genres }}</span> 
          </div>
          <span v-if="isInCollections(movie.id)">you have this!</span>
          {{ getPrice(movie.vote_average) }}
          your balance: {{ balance }}
          <button v-if="isAffordable() && !isInCollections(movie.id)" @click="addToCollection" class="btn btn-primary">Add to Collections</button>
      </div>
    </div>
    <div class="section-recommendation">
      <div class="section--title border-bottom py-lg-3 my-sm-3">
        <h3 class="my-lg-0">Recommendations</h3>
      </div>
      <div class="movie-list row mx-md-0">
        <div :class="['col-md-2','px-md-2','mb-sm-3']" v-for="(movie, key) in recommendations" :key="key">
          <movie-item :title="movie.title" :slug="movie.slug" :cover="movie.cover" :date="movie.date" :rating="movie.rating" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import * as conf from '../../config.js';
import _ from 'lodash';
import movieListItem from './ListItem.vue';
import { priceMixins } from '../../priceMixins.js';
import { collectionsMixins } from '../../collectionsMixins.js';
import { balanceMixins } from '../../balanceMixins.js';
import StarRating from 'vue-star-rating';

export default {
  components:{
    'star-rating':StarRating,
    'movie-item': movieListItem
  },
  data() {
    return {
      movie:{},
      recommendations:[],
      similar:[]
    }
  },
  mixins:[priceMixins,collectionsMixins,balanceMixins],
  mounted() {
    let movieId = this.$route.params.slug.split('-')[0];
    this.movie.id = movieId;
    this.getMovieInfo(movieId);
    this.getRecommendations(movieId);
  },
  methods: {
    addToCollection(){
      this.addCollections(this.movie.id);
      this.balance -= this.getPrice(this.movie.vote_average);
    },
    isAffordable(){
      if( this.balance >= this.getPrice(this.movie.vote_average)){
        return true;
      }
      return false;
    },
    setMovieInfo(movie) {
        this.$set(this.movie,'title', movie.title);
        this.$set(this.movie,'cover',`https://image.tmdb.org/t/p/w500${movie.poster_path}`);
        this.$set(this.movie,'overview', movie.overview);
        this.$set(this.movie,'languages',_.map(movie.spoken_languages,'name').join(','))
        this.$set(this.movie,'genres',_.map(movie.genres,'name').join(','))
        this.$set(this.movie,'vote_average', movie.vote_average)
        this.$set(this.movie,'duration', Math.floor(movie.runtime/60)+' hour '+(movie.runtime%60)+' min' )
    },
    getMovieInfo(movieId){
        axios.get(`${conf.ApiUrl}/${movieId}?api_key=${conf.ClientKey}`).then((
            response) => {
            let movie = response.data;
            this.setMovieInfo(movie);      
        }).catch(function (error) {
            // handle error
            console.error(error);
        })
    },
    getRecommendations(movieId){
        axios.get(`${conf.ApiUrl}/${movieId}/recommendations?api_key=${conf.ClientKey}`).then((
            response) => {
            let movies = response.data.results;    
            this.recommendations = this.transformMoviesDataCollections(movies);
            
        }).catch(function (error) {
            // handle error
            console.error(error);
        })
    },
    transformMoviesDataCollections(movies){
      return _.map(movies, function (movie) {
        return {
          title: movie.title,
          slug: movie.id + '-' + movie.title.toLowerCase().replace(' ', '-'),
          cover: 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
          date: movie.release_date,
          rating: movie.vote_average
        }
      })
    }
  }
}
</script>
<style lang="less">
     .movie-cover{
       img{
         max-width: 100%;
       }
     }
</style>

