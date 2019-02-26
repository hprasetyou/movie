<template>
  <div>
    <h1>Movie list</h1>
    <div class="movie-list row mx-md-0">
      <div :class="['col-md-3','px-md-2','mb-sm-3']"
       v-for="(movie, key) in movies" :key="key">
        <movieItem
        :title="movie.title"
        :slug="movie.slug"
        :cover="movie.cover"
        :year="movie.year"
         />
      </div>
    </div>
  </div>
</template>
<script>
import movieListItem from './ListItem.vue';
  export default {
    components: { 'movieItem':movieListItem},
    data() {
      return {
        movies: [{
          slug: 'wiro-sableng',
          cover: 'https://lorempixel.com/400/200/',
          title: 'Wiro sableng',
          year: 1995,
        },{
          slug: 'wiro-sableng',
          cover: 'https://lorempixel.com/400/200/',
          title: 'Wiro sableng',
          year: 1995,
        },{
          slug: 'wiro-sableng',
          cover: 'https://lorempixel.com/400/200/',
          title: 'Wiro sableng',
          year: 1995,
        },{
          slug: 'wiro-sableng',
          cover: 'https://lorempixel.com/400/200/',
          title: 'Wiro sableng',
          year: 1995,
        },{
          slug: 'wiro-sableng',
          cover: 'https://lorempixel.com/400/200/',
          title: 'Wiro sableng',
          year: 1995,
        },{
          slug: 'wiro-sableng',
          cover: 'https://lorempixel.com/400/200/',
          title: 'Wiro sableng',
          year: 1995,
        },{
          slug: 'wiro-sableng',
          cover: 'https://lorempixel.com/400/200/',
          title: 'Wiro sableng',
          year: 1995,
        },]
      }
    }
  }

</script>
