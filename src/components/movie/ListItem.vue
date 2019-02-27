<template>
  <router-link tag="a" class="movie-list-item" :to="'/'+slug">
    <div class="border rounded">
      <div class="movie-list-item--image">
        <img :src="cover" alt="">
      </div>
      <div class="movie-list-item--info-wrapper p-md-3">
        <h3 class="movie-list-item--title">{{ title }}</h3>
        <p>{{ date }}</p>
        {{ getPrice(rating) }}
      </div>
    </div>
  </router-link>
</template>
<script>
import { priceMixins } from '../../priceMixins.js';

  export default {
    mixins:[priceMixins],
    props: {
      date: String,
      slug: String,
      cover: String,
      title: String,
      rating: Number,
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
  }

</style>