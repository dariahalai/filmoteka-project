import { emptyRefs, btnWatchedRefs} from "./watched";
import {getQueueArray} from './local-storage-set';
 
export const btnQueuedRefs = document.querySelector('button[data-action="queue"]');
// console.log(btnQueuedRefs);

onBtnQueueClick();

btnQueuedRefs.addEventListener('click', onBtnQueueClick);

function onBtnQueueClick() {
  btnQueuedRefs.classList.add('filter__button--active');
  btnWatchedRefs.classList.remove('filter__button--active');

    try {
        let queueFilms = localStorage.getItem("QueueMovies");
        if (queueFilms) {
          queueFilms = JSON.parse(queueFilms);
    
          renderWatchedFilmCards(queueFilms);
    
          emptyRefs.classList.add('is-hidden');
          console.log(queueFilms);
        }
      } catch (error) {console.log(error)}

 // // or!!!

  // renderWatchedFilmCards(getQueueArray);
  // emptyRefs.classList.add('is-hidden');

      return;
    
}