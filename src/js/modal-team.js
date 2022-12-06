// $ npm install @splidejs/splide

import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';

const teamSplide = new Splide('.splide');
teamSplide.mount();
console.log(Splide.defaults);
console.log(teamSplide.defaults);

// teamSplide.mount();
// console.log(teamSplide);
// console.log(teamSplide.defaults);
Splide.defaults = {
  type: 'slide',
  perPage: 4,
  rewind: true,
  keyboard: 'global',
  width: 500,
};
console.log(Splide.defaults);

const teamModalLink = document.querySelector('.team-modal-link');
const modal = document.querySelector('.data-modal-team');
const modalCloseBtn = document.querySelector('.modal-team__close-btn');

teamModalLink.addEventListener('click', teamModalShow);
modalCloseBtn.addEventListener('click', onCloseBtnClick);

function teamModalShow(evt) {
  evt.preventDefault();
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
