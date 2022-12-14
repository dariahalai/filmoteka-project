import spinnerToggle from './spinner';

const refs = {
  form: document.querySelector('.header__form'),
  input: document.querySelector('.header__input'),
  formButton: document.querySelector('.btn'),
  gallery: document.querySelector('.js-gallery'),
  warning: document.querySelector('.header__warning'),
  inputBtnClear: document.querySelector('.btn-cross'),
};

import axios from 'axios';
import {
  renderPagination,
  IN_MAIN_POPULAR,
  IN_MAIN_SEARCH,
} from './pagination.js';
import { getPopulars, renderFilmCards, galleryRef } from './popular.js';
import { KEY } from './constants';

const BASE_URL = 'https://api.themoviedb.org/3';

export class searchMovieApi {
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
if (!refs.inputBtnClear) {
  return;
}
refs.inputBtnClear.style.display = 'none';
function clearSearch() {
  refs.gallery.innerHTML = '';
}
// this function will be call if input or results is empty. No possibility to check at same time, becouse error occured when search string is empty!
refs.input.addEventListener('input', onInputClear);
function onInputClear(evt) {
  const inputValue = refs.input.value;

  if (inputValue) {
    refs.inputBtnClear.style.display = 'block';

    refs.inputBtnClear.addEventListener('click', () => {
      refs.inputBtnClear.style.display = 'none';
      refs.input.value = '';
      return;
    });
  }
}
function emptyQueryOrNoResults() {
  refs.warning.insertAdjacentHTML(
    'beforeend',
    `<div class="header__warning-message">Search result not successful. Enter the correct movie name.</div>`
  );

  setTimeout(() => {
    refs.warning.innerHTML = '';
  }, 4000);

  galleryRef.innerHTML = '';

  getPopulars(1).then(({ page, results, total_pages: pages }) => {
    renderFilmCards(results);
    renderPagination(page, pages, IN_MAIN_POPULAR);
  });
}

refs.form.addEventListener('submit', onSearchClick);

function onSearchClick(evt) {
  spinnerToggle();
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
      spinnerToggle();
      emptyQueryOrNoResults();
      return;
    }

    clearSearch();

    // renderFilmCards(data); Andrii
    renderFilmCards(results);
    // Add rendering of pagination
    renderPagination(page, total_pages, IN_MAIN_SEARCH);
    spinnerToggle();
  });
}
