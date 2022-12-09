import * as storageLocal from './local-storage.js';
import ModalFilm from './modal-film.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  closeBtn: document.querySelector('[data-modal-close]'),
  activLibraryBtn: document.querySelector(
    '.filter__item>.filter__button--active'
  ),
};
console.log(refs.activLibraryBtn.textContent);
const modalFilm = new ModalFilm();

refs.gallery.addEventListener('click', onOpenModal);
refs.closeBtn.addEventListener('click', onCloseModal);
window.addEventListener('keydown', onCloseModalEsc);
document.addEventListener('click', onOverlayClose);

function onOpenModal(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') return;

  const dataCurentFilm = getFilmData(e.target.id);

  modalFilm.modifyDataFilm(dataCurentFilm);
  modalFilm.open();

  refs.closeBtn.addEventListener('click', onCloseModal);
  window.addEventListener('keydown', onCloseModalEsc);
}

function onCloseModal() {
  modalFilm.close();

  refs.closeBtn.removeEventListener('click', onCloseModal);
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
  const filmList =
    refs.activLibraryBtn.textContent === 'Queue'
      ? storageLocal.load('QueueMovies')
      : storageLocal.load('WatchedMovies');
  return filmList.find(film => film.id === Number(filmId));
}

function onOverlayClose(e) {
  // e.preventDefault();

  if (!e.target.closest('.modal') && e.target.closest('.backdrop')) {
    onCloseModal();
  }
}
