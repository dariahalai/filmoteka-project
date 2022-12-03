import axios from 'axios';

const KEY = '9068359f92c010fa6a3cf763f10a0606';
const MEDIA_TYPE = 'movie';
const TIME_WINDOW = 'week';
const API = 'https://api.themoviedb.org/3/';
const TRENDING = 'trending';
const GENRES = 'genre/movie/list';
const KEY_GENRES = 'current-genres';
const IMG_PATH = 'https://image.tmdb.org/t/p/';
const LARGE_SIZE = 'original';
const SMALL_SIZE = 'w500';

let currentPage = 0;
let totalPages = 0;
let genresLoaded = false;

const galleryRef = document.querySelector('.js-gallery');

window.addEventListener('load', () => {
  galleryRef.setHTML('');

  getPopulars(1).then(response => {
    const { page, results, total_pages: pages } = response;
    currentPage = page;
    totalPages = pages;

    console.log(response);

    renderFilmCards(results);
    // renderPagination(page, pages);
  });
});

async function getPopulars(page) {
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

    return response.data;
  } catch (error) {
    console.log('Підставити картинку, сервер терміново недоступний');
  }
}

function renderFilmCards(data) {
  let markup = data.map(
    ({
      backdrop_path,
      poster_path,
      genre_ids,
      id,
      title,
      overview,
      release_date,
    }) => {
      let genres = getGenres(genre_ids);
      if (!title) title = 'no information';
      let year = release_date.substring(0, 4);
      let largeImg = IMG_PATH + LARGE_SIZE + backdrop_path;
      let smallImg = IMG_PATH + SMALL_SIZE + backdrop_path;
      console.log(genre_ids, title, year, largeImg, smallImg);
    }
  );
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

function getGenres(arr) {
  if (!genresLoaded) {
    getOriginGenres().then(response => {
      localStorage.setItem(KEY_GENRES, JSON.stringify(response));
      genresLoaded = true;
      // return response.map(({ name, id }) => arr.includes(id)).join(', ');
    });
  }
}
