import { emptyRefs } from './watched';

import { renderWatchedFilmCards } from './watched';

export const btnQueuedRefs = document.querySelector(
  'button[data-action="queue"]'
);
const btnWatchedRefs = document.querySelector('button[data-action="watched"]');
const galleryLibrary = document.querySelector('[data-action="list-library"]');
// console.log(btnQueuedRefs);
// console.log(btnWatchedRefs);

// onBtnQueueClick();

window.addEventListener('load', () => onBtnQueueClick());

btnQueuedRefs.addEventListener('click', onBtnQueueClick);

function onBtnQueueClick() {
  clearContainer();

  btnQueuedRefs.classList.add('filter__button--active');
  btnWatchedRefs.classList.remove('filter__button--active');

  try {
    let queueFilms = localStorage.getItem('QueueMovies');
    if (queueFilms) {
      queueFilms = JSON.parse(queueFilms);

      renderWatchedFilmCards(queueFilms);

      emptyRefs.classList.add('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }

  return;
}

function clearContainer() {
  galleryLibrary.innerHTML = '';
}
