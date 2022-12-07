// $ npm install @splidejs/splide

import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';

const teamSplide = new Splide('.splide', {
  type: 'slide',
  perPage: 4,
  rewind: true,
  keyboard: 'global',
  gap: 10,
  arrows: false,
  rewind: false,
  pagination: false,
  mediaQuery: 'max',
  breakpoints: {
    767: {
      direction: 'ttb',
      perPage: 2,
      perMove: 1,
      height: 650,
    },
  },
});
teamSplide.mount();

const teamModalLink = document.querySelector('.team-modal-link');
const modal = document.querySelector('.data-modal-team');
const modalPoster = document.querySelector('.poster-modal');
const modalCloseBtn = document.querySelector('.modal-team__close-btn');

teamModalLink.addEventListener('click', teamModalShow);
modalCloseBtn.addEventListener('click', onCloseBtnClick);
modal.addEventListener('click', onBackdropClick);

function teamModalShow(evt) {
  evt.preventDefault();
  modalPoster.classList.remove('is-hidden');
  setTimeout(() => {
    modalPoster.classList.add('is-hidden');
  }, 1500);

  modal.classList.toggle('is-hidden');
  document.body.classList.toggle('body--modal-open');
  document.addEventListener('keydown', onEscModalTeam);
}
function onEscModalTeam(evt) {
  if (evt.code === 'Escape') {
    onCloseBtnClick();
    document.removeEventListener('keydown', onEscModalTeam);
  }
}
function onCloseBtnClick() {
  modal.classList.toggle('is-hidden');
  document.body.classList.toggle('body--modal-open');
}

function onBackdropClick(evt) {
  if (evt.target.classList.contains('data-modal-team')) {
    onCloseBtnClick();
  }
}
