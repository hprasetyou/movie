import movieList from './components/movie/List.vue';
import movieDetail from './components/movie/Detail.vue';

export const routes = [
    { path: '', component: movieList },
    { path: '/:slug', component: movieDetail }
];