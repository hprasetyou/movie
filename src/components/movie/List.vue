<template>
  <div>
    <h1>Movie list</h1>
    <div class="movie-list row">
      <div class="col-sm-3" v-for="(movie, key) in movies" :key="key">
        <a :href="movie.slug" class="movie-list-item">
          <div class="border rounded">
            <div class="movie-list-item--image">
              <img :src="movie.cover" alt="">
            </div>
            <div class="movie-list-item--info-wrapper">
              <h3 class="movie-list-item--title">{{ movie.title }}</h3>
              <p>{{ movie.year }}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        movies: [{
          slug: 'wiro-sableng',
          cover: 'https://lorempixel.com/400/200/',
          title: 'Wiro sableng',
          year: 1995,
        }]
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
  }

</style>
