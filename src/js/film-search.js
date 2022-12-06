const refs = {
  form: document.querySelector('.header__form'),
  input: document.querySelector('header__input'),
  formButton: document.querySelector('.btn'),
  gallery: document.querySelector('.js-gallery'),
  warning: document.querySelector('.header__warning'),
};

import axios from 'axios';
import {
  renderPagination,
  IN_POPULAR,
  IN_SEARCH,
  KEY_NOW,
} from './pagination.js';
import { getPopulars, renderFilmCards, galleryRef } from './popular.js';

const KEY = '9068359f92c010fa6a3cf763f10a0606';
const BASE_URL = 'https://api.themoviedb.org/3';

class searchMovieApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async searchMovieFetch(page) {
    const searchMovieParams = new URLSearchParams({
      api_key: KEY,
      language: 'en-US',
      query: `${this.searchQuery}`,
      page: page,
      include_adult: false,
    });

    try {
      const response = await axios.get(
        `${BASE_URL}/search/movie?${searchMovieParams}`
      );

      if (response.status !== 200) {
        throw new Error(response.status);
      }

      // return response.data.results;
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.page = 1;
  }
}

export const movieApi = new searchMovieApi();

function clearSearch() {
  refs.gallery.innerHTML = '';
}
// this function will be call if input or results is empty. No possibility to check at same time, becouse error occured when search string is empty!

function emptyQueryOrNoResults() {
  refs.warning.insertAdjacentHTML(
    'beforeend',
    `<div class="header__warning-message">Search result not successful. Enter the correct movie name.</div>`
  );

  setTimeout(() => {
    refs.warning.innerHTML = '';
  }, 4000);

  localStorage.setItem(KEY_NOW, IN_POPULAR);

  galleryRef.innerHTML = '';

  getPopulars(1).then(({ page, results, total_pages: pages }) => {
    renderFilmCards(results);
    renderPagination(page, pages);
  });
}

refs.form.addEventListener('submit', onSearchClick);

function onSearchClick(evt) {
  evt.preventDefault();

  movieApi.query = evt.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();
  // If empty - show Popular
  if (!movieApi.query) {
    emptyQueryOrNoResults();
    return;
  }

  movieApi.resetPage();

  movieApi.searchMovieFetch(1).then(data => {
    if (!data) return;
    // Destructure Andrii
    const { page, total_pages, results } = data;
    // If no results - show Popular
    if (!total_pages) {
      emptyQueryOrNoResults();
      return;
    }

    clearSearch();
    // Write to LS now
    localStorage.setItem(KEY_NOW, IN_SEARCH);

    // renderFilmCards(data); Andrii
    renderFilmCards(results);
    // Add rendering of pagination

    renderPagination(page, total_pages);
  });
}
