import {
  emptyRefs,
  btnWatchedRefs,
} from './watched';

import { renderWatchedFilmCards } from './watched';


export const btnQueuedRefs = document.querySelector(
  'button[data-action="queue"]'
);

// const QUEUE_KEY = 'QueueMovies';

window.addEventListener('load', () => onBtnQueueClick());

btnQueuedRefs.addEventListener('click', onBtnQueueClick);

export function onBtnQueueClick() {
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
