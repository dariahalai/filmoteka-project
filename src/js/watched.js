import { btnQueuedRefs } from './queue.js';
import { getGenre } from './modal-film.js';


export const IMG_PATH = 'https://image.tmdb.org/t/p/';
export const SMALL_SIZE = 'w500';
// const WATCHED_KEY = 'WatchedMovies';


export const btnWatchedRefs = document.querySelector(
  'button[data-action="watched"]'
);
export const emptyRefs = document.querySelector('[data-action="empty"]');
export const galleryLibrary = document.querySelector(
  '[data-action="list-library"]'
);

btnWatchedRefs.addEventListener('click', onBtnWatchedClick);

export function onBtnWatchedClick() {
  btnQueuedRefs.classList.remove('filter__button--active');
  btnWatchedRefs.classList.add('filter__button--active');
  try {
    let watchedFilms = localStorage.getItem('WatchedMovies');
    if (watchedFilms) {
      watchedFilms = JSON.parse(watchedFilms);
      renderWatchedFilmCards(watchedFilms);

      emptyRefs.classList.add('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
  return;
}


export function renderWatchedFilmCards(data) {
  const markup = data
    .map(({ id, poster_path, genre_ids, title, release_date }) => {
      let genresStr = getGenre(genre_ids);
      let year = release_date.substring(0, 4);
      if (genresStr && year) genresStr += ' | ';
      if (!title) title = 'no information';

      let smallImg = !!poster_path
        ? IMG_PATH + SMALL_SIZE + poster_path
        : NO_IMAGE;
      return `
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
    })
    .join('');

  galleryLibrary.innerHTML = markup;
}
