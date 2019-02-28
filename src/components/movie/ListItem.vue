<template>
  <router-link tag="a" class="movie-list-item" :to="'/'+slug">
    <div :class="['border','rounded',(display=='list'?'row':display)]">
      <div :class="['movie-list-item--image',(display=='list'?'col-4 px-0 col-lg-3':'')]">
        <img :src="cover" alt="">
      </div>
      <div :class="['movie-list-item--info-wrapper','p-md-3',(display=='list'?'col-8 col-lg-9':'')]">
        <h3 class="movie-list-item--title mb-0">{{ title }}</h3>
        <small class="movie-list-item--year">{{ year }}</small>
        <star-rating  v-if="showRating" v-model="rating" :max-rating="10" :read-only="true" :show-rating="false" :increment="0.1" :star-size="15"></star-rating>  
        <p v-if="showPrice" class="movie-list-item--rating">{{ getPriceString(rating) }}</p>
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
      display: {
        default: 'grid',
        type: String
      },
      date: String,
      slug: String,
      cover: String,
      title: String,
      rating: Number,
      showPrice: {
        default: true,
        type: Boolean
      },
      showRating: {
        default: true,
        type: Boolean
      }
    },
    computed:{
      year(){
        return this.date.split('-')[0]
      }
    }
  }

</script>
<style lang="less">
@grid-bg-color: #111111;
@grid-text-color: #ffffff;
  .movie-list-item {
    & > div{
      overflow: hidden;
    }
    .grid{
      position: relative;
    }
    &--info-wrapper{
      .grid &{
        position: absolute;
        bottom: 0;
        width: 100%;
        color: @grid-text-color;
        background: fadeout(@grid-bg-color,50%);
        transition: all .3s ease-out;
        height: 40%;
      }
      .grid:hover &{
        height: 50%;
      }
    }

    &,
    &:hover {
      color: inherit;
    }

    &:hover {
      text-decoration: none;
      .grid img {
        transform: scale(1.04);
        filter: blur(2px);
      }
    }

    &--image {
      overflow: hidden;
      img {
        transform: scale(1);
        transition: all .3s ease-out;
        width: 100%;
      }
    }

    &--title{
      font-size: inherit;
    }
  }

</style>
