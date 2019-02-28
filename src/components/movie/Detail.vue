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
            <star-rating v-model="movie.rating" :read-only="true" :increment="0.5" :star-size="15"></star-rating>
            <span>Language: {{ movie.languages }}</span>
          </div>
          <div class="movie-description mb-lg-4">
            <p>{{ movie.overview }}</p>
          </div>
          <div class="movie-info">
            <span>Genres: </span><span class="font-italic">{{ movie.genres }}</span> 
          </div>
          <span v-if="isInCollections(movie)">you have this!</span>
          <div class="movie-price">
            <h4>{{ getPriceString(movie.rating) }}</h4>
            <p>your balance: {{ formatRp(balance) }}</p>
          </div>
          
          <button v-if="isAffordable() && !isInCollections(movie)" @click="addToCollection" class="btn btn-primary">Add to Collections</button>
      </div>
    </div>
    <div class="section-credits">
      <div class="section--title border-bottom py-lg-3 my-sm-3">
        <h3 class="my-lg-0">Crew & Cast</h3>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <h5>Cast</h5>
          <div class="cast-list row">
            <div class="col-lg-3 px-lg-2" v-for="(cast, key) in credits.cast" :key="key">
              <crew :name="cast.name" :role="cast.character" :profilePath="cast.profile_path" />
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <h5>Crew</h5>
          <div class="crew-list row">
            <div class="col-lg-3 mb-lg-3 px-lg-2" v-for="(crew, key) in credits.crew" :key="key">
              <crew :name="crew.name" :role="crew.job" :profilePath="crew.profile_path" />
            </div>
          </div>
        </div>
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
    <div class="section-recommendation">
      <div class="section--title border-bottom py-lg-3 my-sm-3">
        <h3 class="my-lg-0">Similar</h3>
      </div>
      <div class="movie-list row mx-md-0">
        <div :class="['col-md-2','px-md-2','mb-sm-3']" v-for="(movie, key) in similar" :key="key">
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
import crewListItem from '../crew/listItem.vue';
import { priceMixins } from '../../priceMixins.js';
import { collectionsMixins } from '../../collectionsMixins.js';
import { balanceMixins } from '../../balanceMixins.js';
import StarRating from 'vue-star-rating';

export default {
  components:{
    'star-rating':StarRating,
    'movie-item': movieListItem,
    'crew': crewListItem
  },
  data() {
    return {
      movie:{},
      recommendations:[],
      similar:[],
      credits:{},
      casts:[]
    }
  },
  mixins:[priceMixins,collectionsMixins,balanceMixins],
  mounted() {
    this.loadMovie();
  },
  methods: {
    loadMovie(){
      let slug = this.$route.params.slug
      let movieId = slug.split('-')[0];
      this.movie.slug = slug;
      this.movie.id = movieId;
      this.getMovieInfo(movieId);
      this.getRecommendations(movieId);
      this.getSimilar(movieId);
    },
    addToCollection(){
      this.addCollections(this.movie);
      this.balance -= this.getPrice(this.movie.rating);
    },
    isAffordable(){
      if( this.balance >= this.getPrice(this.movie.rating)){
        return true;
      }
      return false;
    },
    setMovieInfo(movie) {
      console.log(movie.credits);
      
        this.$set(this.movie,'title', movie.title);
        this.$set(this.movie,'cover',`https://image.tmdb.org/t/p/w500${movie.poster_path}`);
        this.$set(this.movie,'overview', movie.overview);
        this.$set(this.movie,'date', movie.release_date);
        this.$set(this.movie,'languages',_.map(movie.spoken_languages,'name').join(','));
        this.$set(this.movie,'genres',_.map(movie.genres,'name').join(','));
        this.$set(this.movie,'rating', movie.vote_average);
        this.$set(this.movie,'duration', Math.floor(movie.runtime/60)+' hour '+(movie.runtime%60)+' min' );
        this.credits = movie.credits;
    },
    getMovieInfo(movieId){
        axios.get(`${conf.ApiUrl}/${movieId}?api_key=${conf.ClientKey}&append_to_response=credits`).then((
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
    getSimilar(movieId){
        axios.get(`${conf.ApiUrl}/${movieId}/similar?api_key=${conf.ClientKey}`).then((
            response) => {
            let movies = response.data.results;    
            this.similar = this.transformMoviesDataCollections(movies);
            
        }).catch(function (error) {
            // handle error
            console.error(error);
        })
    },
    transformMoviesDataCollections(movies){
      return _.map(movies, function (movie) {        
        return {
          title: movie.title,
          slug: movie.id + '-' + movie.title.replace(/\s+/g, '-').toLowerCase(),
          cover: 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
          date: movie.release_date,
          rating: movie.rating
        }
      })
    }
  },
  watch:{
    $route (to, from){
        console.log('route uupdated');
        this.loadMovie();
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

