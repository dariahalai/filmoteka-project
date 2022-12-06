import{btnQueuedRefs} from './queue';

console.log('watched');
export const btnWatchedRefs = document.querySelector('button[data-action="watched"]');
export const emptyRefs = document.querySelector('[data-action="empty"]');
export const galleryLibrary = document.querySelector(
  '[data-action="list-library"]'
);

console.log(btnWatchedRefs);
console.log(emptyRefs);
console.log(galleryLibrary);

// onBtnWatchedClick();

btnWatchedRefs.addEventListener('click', onBtnWatchedClick);

function onBtnWatchedClick() {
  btnQueuedRefs.classList.remove('filter__button--active');
  btnWatchedRefs.classList.add('filter__button--active');
  try {
    let watchedFilms = localStorage.getItem(KEY);
    if (watchedFilms) {
      watchedFilms = JSON.parse(watchedFilms);

      renderWatchedFilmCards(watchedFilms);

      emptyRefs.classList.add('is-hidden');
      console.log(watchedFilms);
    }
  } catch (error) {
    console.log(error);
  }
  return;
}

export function renderWatchedFilmCards(data) {
  const markup = data
    .map(({ id, poster_path, genre_ids, title, release_date }) => {
      let genresStr = getGenres(genre_ids);
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

  galleryLibrary.insertAdjacentHTML('beforebegin', markup);
}
