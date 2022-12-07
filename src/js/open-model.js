import * as storageLocal from './local-storage.js';
import ModalFilm from './modal-film';
import { handleBackButtonClick, trailerButtonRef,  handleTrailerButtonClick} from './trailer';

import { sendWatchedToStorage, sendQueueToStorage } from "./local-storage-set";

const refs = {
  gallery: document.querySelector('.js-gallery'),
  closeBtn: document.querySelector('[data-modal-close]'),
  btnWatched: document.querySelector(".btn_watched"),
  btnQueue: document.querySelector(".btn_queue"),
};

const modalFilm = new ModalFilm();

refs.gallery.addEventListener('click', onOpenModal);
refs.closeBtn.addEventListener('click', onCloseModal);
window.addEventListener('keydown', onCloseModalEsc);  

function onOverlayClose(event) {
  if (!event.target.closest(".modal") && event.target.closest('.backdrop')) {
      onCloseModal();
  }
}
document.addEventListener("click", onOverlayClose)

function onOpenModal(e) {
  e.preventDefault();
  trailerButtonRef.addEventListener('click', handleTrailerButtonClick);

  if (e.target.nodeName !== 'IMG') return;

  const dataCurentFilm = getFilmData(e.target.id);

  modalFilm.modifyDataFilm(dataCurentFilm);
  modalFilm.open();

///// for local-storage and button /////////
  checkWatchedStorage(dataCurentFilm)
  if (refs.btnWatched.classList.contains("watched_remove")) {
      refs.btnWatched.textContent = 'REMOVE FROM WATCHED'
  } 

  checkQueueStorage(dataCurentFilm)
  if (refs.btnQueue.classList.contains("queue_remove")) {
      refs.btnQueue.textContent = 'REMOVE FROM QUEUE'
  } 
  
  refs.btnWatched.addEventListener("click", onWatchedBtnClick)
  refs.btnQueue.addEventListener("click", onQueueBtnClick)
    
  
  function onWatchedBtnClick() {
    // connst filmData = dataCurentFilm
    if (refs.btnWatched.classList.contains("watched_send")) {
      refs.btnWatched.textContent = 'REMOVE FROM WATCHED'
      refs.btnWatched.classList.replace("watched_send", "watched_remove")

      sendWatchedToStorage(dataCurentFilm)
    } else if (refs.btnWatched.classList.contains("watched_remove")) {
      refs.btnWatched.textContent = 'ADD TO WATCHED'  
      refs.btnWatched.classList.replace("watched_remove", "watched_send")

      removeWatchedFilm(dataCurentFilm)
    } 
  }
 
  function removeWatchedFilm(currentFilm) {
      try {
        const getWatchedFromStorage = localStorage.getItem("WatchedMovies")
        const getWatchedArray = JSON.parse(getWatchedFromStorage)

        const watchedFilmIndex = getWatchedArray.findIndex(value => value.id === currentFilm.id);
        getWatchedArray.splice(watchedFilmIndex, 1)
        localStorage.setItem("WatchedMovies", JSON.stringify(getWatchedArray))
        
        refs.btnWatched.classList.replace("watched_remove", "watched_send")

    } catch (error) {
      console.error('Get state error: ', error.message);
    }
}
  
  function onQueueBtnClick() {
    if (refs.btnQueue.classList.contains("queue_send")) {
      refs.btnQueue.textContent = 'REMOVE FROM QUEUE'
      refs.btnQueue.classList.replace("queue_send", "queue_remove")

      sendQueueToStorage(dataCurentFilm)
    } else if (refs.btnQueue.classList.contains("queue_remove")) {
      refs.btnQueue.textContent = 'ADD TO QUEUE'  
      refs.btnQueue.classList.replace("queue_remove", "queue_send")

      removeQueueFilm(dataCurentFilm)
    } 
  }

  function removeQueueFilm(currentFilm) {
      try {
        const getQueueFromStorage = localStorage.getItem("QueueMovies")
        const getQueueArray = JSON.parse(getQueueFromStorage)

        const QueueFilmIndex = getQueueArray.findIndex(value => value.id === currentFilm.id);
        getQueueArray.splice(QueueFilmIndex, 1)
        localStorage.setItem("QueueMovies", JSON.stringify(getQueueArray))
        
        refs.btnQueue.classList.replace("queue_remove", "queue_send")

    } catch (error) {
      console.error('Get state error: ', error.message);
    }
}
///////////////////end of local-storage ///////////

  refs.closeBtn.addEventListener('click', onCloseModal);
  window.addEventListener('keydown', onCloseModalEsc);
}

function onCloseModal() {
  const iframeContainer = document.querySelector('.iframe-container');
  const trailerContainer = document.querySelector('.film__info-wrapper');
  handleBackButtonClick(iframeContainer, trailerContainer);
  modalFilm.close();
  refs.closeBtn.removeEventListener('click', onCloseModal);
  trailerButtonRef.removeEventListener('click', handleTrailerButtonClick);
  window.removeEventListener('keydown', onCloseModalEsc);

    ////////////////////
  // refs.btnWatched.removeEventListener("click", onWatchedBtnClick)
  // refs.btnQueue.removeEventListener("click", onQueueBtnClick)


  //////////Примусове перезавантаження сторінки /////////////////////////////////
  window.location.reload()
}

function onCloseModalEsc(e) {
  if (e.code === 'Escape') {
    modalFilm.close();

    refs.closeBtn.removeEventListener('click', onCloseModal);
    window.removeEventListener('keydown', onCloseModalEsc);
  }
}

function getFilmData(filmId) {
  const filmList = storageLocal.load('film-current-page');
  return filmList.find(film => film.id === Number(filmId));
}

////////////// checks for button /////////////////

function checkWatchedStorage(currentFilm) {
  try {
    const getWatchedFromStorage = localStorage.getItem("WatchedMovies")
    const getWatchedArray = JSON.parse(getWatchedFromStorage)
    const checkWatchedStorage = getWatchedArray.find(option => option.id === currentFilm.id);
        if (checkWatchedStorage) {
          refs.btnWatched.classList.replace("watched_send", "watched_remove")
        } else {
          refs.btnWatched.classList.replace("watched_remove", "watched_send")
        }
    } catch (error) {
      console.error('Get state error: ', error.message);
      refs.btnWatched.classList.replace("watched_remove", "watched_send")
    }
}

function checkQueueStorage(currentFilm) {
  try {
    const getQueueFromStorage = localStorage.getItem("QueueMovies")
    const getQueueArray = JSON.parse(getQueueFromStorage)
    const checkQueueStorage = getQueueArray.find(option => option.id === currentFilm.id);
        if (checkQueueStorage) {
          refs.btnQueue.classList.replace("queue_send", "queue_remove")
        } else {
          refs.btnQueue.classList.replace("queue_remove", "queue_send")
        }
    } catch (error) {
      console.error('Get state error: ', error.message);
      refs.btnQueue.classList.replace("queue_remove", "queue_send")
    }
}
