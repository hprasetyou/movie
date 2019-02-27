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
          <button v-if="isAffordable() && !isInCollections(movie.id)" @click="addToCollection" class="btn btn-primary">Add to Collections</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import * as conf from '../../config.js';
import _ from 'lodash';
import { priceMixins } from '../../priceMixins.js';
import { collectionsMixins } from '../../collectionsMixins.js';
import { balanceMixins } from '../../balanceMixins.js';
import StarRating from 'vue-star-rating';

export default {
  components:{
    'star-rating':StarRating
  },
  data() {
    return {
      movie:{}
    }
  },
  mixins:[priceMixins,collectionsMixins,balanceMixins],
  mounted() {
    this.movie.id = this.$route.params.slug.split('-')[0];
    axios.get(`${conf.ApiUrl}/${this.movie.id}?api_key=${conf.ClientKey}`).then((
        response) => {
        let movie = response.data;
        this.setMovie(movie);      
    }).catch(function (error) {
        // handle error
        console.error(error);
    })
  },
  methods: {
    addToCollection(){
      this.addCollections(this.movie.id);
      this.setBalance(this.getBalance() - this.getPrice(this.movie.vote_average));
      console.log(this.getCollections());
      
    },
    isAffordable(){
      if( this.getBalance() >= this.getPrice(this.movie.vote_average)){
        return true;
      }
      return false;
    },
    setMovie(movie) {
        this.$set(this.movie,'title', movie.title);
        this.$set(this.movie,'cover',`https://image.tmdb.org/t/p/w500${movie.poster_path}`);
        this.$set(this.movie,'overview', movie.overview);
        this.$set(this.movie,'languages',_.map(movie.spoken_languages,'name').join(','))
        this.$set(this.movie,'genres',_.map(movie.genres,'name').join(','))
        this.$set(this.movie,'vote_average', movie.vote_average)
        this.$set(this.movie,'duration', Math.floor(movie.runtime/60)+' hour '+(movie.runtime%60)+' min' )
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

