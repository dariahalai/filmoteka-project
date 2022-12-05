import { emptyRefs} from "./watched";

const btnQueuedRefs = document.querySelector('button[data-action="queue"]');
// console.log(btnQueuedRefs);

btnQueuedRefs.addEventListener('click', onBtnQueueClick);

function onBtnQueueClick() {
    try {
        let queueFilms = localStorage.getItem(KEY);
        if (queueFilms) {
          queueFilms = JSON.parse(queueFilms);
    
          renderWatchedFilmCards(queueFilms);
    
          emptyRefs.classList.add('is-hidden');
          console.log(queueFilms);
        }
      } catch (error) {console.log(error)}
      return;
    
}