import axios from 'axios';

import { renderPagination, IN_POPULAR, KEY_NOW } from './pagination.js';

// імпорт файлу сховища та запис в змінну ключа
import * as storageLocal from './local-storage.js';
const FILM_CURRENT_PAGE = 'film-current-page';
//
const KEY = '9068359f92c010fa6a3cf763f10a0606';
const MEDIA_TYPE = 'movie';
const TIME_WINDOW = 'week';
const API = 'https://api.themoviedb.org/3/';
const TRENDING = 'trending';
const GENRES = 'genre/movie/list';
const IMG_PATH = 'https://image.tmdb.org/t/p/';
const SMALL_SIZE = 'w500';
export const NO_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';


export let genresList;
export let totalPages = 0;


getOriginGenres().then(response => {
  genresList = Array.from(response.genres);
});

export const galleryRef = document.querySelector('.js-gallery');
const warning = document.querySelector('.header__warning');

window.addEventListener('load', () => {
  galleryRef.innerHTML = '';
  localStorage.setItem(KEY_NOW, IN_POPULAR);

  getPopulars(1)
    .then(({ page, results, total_pages: pages }) => {
      renderFilmCards(results);
      renderPagination(page, pages);
    })
    .catch(() => {
      warning.insertAdjacentHTML(
        'beforeend',
        `<div class="header__warning-message">Service is temporarily unavailable.</div>`
      );

      setTimeout(() => {
        warning.innerHTML = '';
      }, 4000);
    });
});

export async function getPopulars(page) {
  try {
    const searchParams = new URLSearchParams({
      api_key: KEY,
      page: page,
    });

    const response = await axios.get(
      `${API}${TRENDING}/${MEDIA_TYPE}/${TIME_WINDOW}?${searchParams}`
    );

    if (response.status !== 200) {
      throw new Error(response.status);
    }

    console.log("респонс Барчука", response.data)

    return response.data;
  } catch (error) {
    console.log('Підставити картинку, сервер терміново недоступний');
  }
}

export function renderFilmCards(data) {
  let markup = '';
  data.forEach(({ id, poster_path, genre_ids, title, release_date }) => {
    let genresStr = getGenres(genre_ids);
    let year = !release_date ? '' : release_date.substring(0, 4);
    if (genresStr && year) genresStr += ' | ';
    if (!title) title = 'no information';

    let smallImg = !!poster_path
      ? IMG_PATH + SMALL_SIZE + poster_path
      : NO_IMAGE;

    markup += `
      <li class="film-card">
         	<a href="#" class="film-card__link">
            <img
              class="film-card__film-img"
              src="${smallImg}"
              alt="${title}"
              id="${id}"
            />
            <h3 class="film-card__film-name">${title}</h3>
            <p class="film-card__genre">${genresStr}${year}</p>
          </a>
        </li>
							`;
  });

  galleryRef.setHTML(markup);

  // запис в локальне сховище
  storageLocal.save(FILM_CURRENT_PAGE, [...data]);
  //
}

async function getOriginGenres() {
  try {
    const searchParams = new URLSearchParams({
      api_key: KEY,
    });

    const response = await axios.get(`${API}${GENRES}?${searchParams}`);

    if (response.status !== 200) {
      throw new Error(response.status);
    }

    return response.data;
  } catch (error) {
    console.log('Підставити картинку, сервер терміново недоступний');
  }
}

export function getGenres(genreSet) {
  let genreStr = '';

  genreSet.forEach(id => {
    for (const genre of genresList) {
      if (genre.id === id) genreStr += genre.name + ', ';
    }
  });

  return !genreStr ? '' : genreStr.substring(0, genreStr.length - 2);
}

export const getMovieTrailer = async movieId => {
  try {
    const searchParams = new URLSearchParams({
      api_key: KEY,
    });

    const response = await axios.get(
      `${API}${MEDIA_TYPE}/${movieId}/videos?${searchParams}`
    );

    if (response.status !== 200) {
      throw new Error(response.status);
    }

    return response.data;
  } catch (error) {
    console.log('Підставити картинку, сервер терміново недоступний');
  }
};
