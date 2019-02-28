<template>
  <router-link tag="a" class="movie-list-item" :to="'/'+slug">
    <div class="border rounded">
      <div class="movie-list-item--image">
        <img :src="cover" alt="">
      </div>
      <div class="movie-list-item--info-wrapper p-md-3">
        <h3 class="movie-list-item--title">{{ title }}</h3>
        <span class="float-right pt-md-2">{{ year }}</span>
        <star-rating v-model="rating" :read-only="true" :show-rating="false" :increment="0.5" :star-size="15"></star-rating>  
        {{ getPrice(rating) }}
      </div>
    </div>
  </router-link>
</template>
<script>
  import {
    priceMixins
  } from '../../priceMixins.js';
  import StarRating from 'vue-star-rating';

  export default {
    components: {
      'star-rating': StarRating
    },
    mixins: [priceMixins],
    props: {
      date: String,
      slug: String,
      cover: String,
      title: String,
      rating: Number,
    },
    computed:{
      year(){
        return this.date.split('-')[0]
      }
    }
  }

</script>
<style lang="less">
  .movie-list-item {

    &,
    &:hover {
      color: inherit;
    }

    &:hover {
      text-decoration: none;
    }

    &--image {
      img {
        width: 100%;
      }
    }

    &--title{
      font-size: inherit;
    }
  }

</style>
