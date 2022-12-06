import * as storageLocal from './local-storage.js';
import ModalFilm from './modal-film';
import { handleBackButtonClick, trailerButtonRef,  handleTrailerButtonClick} from './trailer';

import { onQueueBtnClick, onWatchedBtnClick } from "./local-storage-set";

const refs = {
  gallery: document.querySelector('.js-gallery'),
  closeBtn: document.querySelector('[data-modal-close]'),
};

const modalFilm = new ModalFilm();

refs.gallery.addEventListener('click', onOpenModal);
refs.closeBtn.addEventListener('click', onCloseModal);
window.addEventListener('keydown', onCloseModalEsc);

function onOpenModal(e) {
  e.preventDefault();
  trailerButtonRef.addEventListener('click', handleTrailerButtonClick);

  if (e.target.nodeName !== 'IMG') return;

  const dataCurentFilm = getFilmData(e.target.id);

  modalFilm.modifyDataFilm(dataCurentFilm);
  modalFilm.open();

///// for local-storage-set /////////
  onWatchedBtnClick(dataCurentFilm)
  onQueueBtnClick(dataCurentFilm)
//////////////////////////////

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

//////////////


