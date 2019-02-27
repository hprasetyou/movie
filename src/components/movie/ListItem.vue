<template>
  <router-link tag="a" class="movie-list-item" :to="'/'+slug">
    <div class="border rounded">
      <div class="movie-list-item--image">
        <img :src="cover" alt="">
      </div>
      <div class="movie-list-item--info-wrapper p-md-3">
        <h3 class="movie-list-item--title">{{ title }}</h3>
        <p>{{ year }}</p>
      </div>
    </div>
  </router-link>
</template>
<script>
  export default {
    props: {
      year: Number,
      slug: String,
      cover: String,
      title: String
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