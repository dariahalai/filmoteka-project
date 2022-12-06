import { renderFilmCards, getPopulars } from './popular.js';

import { movieApi } from './film-search.js';

const pagRef = document.querySelector('.js-pagination');
const leftArrowRef = document.querySelector('.js-pagination__arrow-left');
const rightArrowRef = document.querySelector('.js-pagination__arrow-right');
const pagContainerRef = document.querySelector('.js-pagination__container');

let currentPage = 0;
export const KEY_NOW = 'now';
export const IN_POPULAR = '1';
export const IN_SEARCH = '0';

export function renderPagination(page, pages) {
  let prevPage = page - 1;
  let twoPrevPage = page - 2;
  let nextPage = page + 1;
  let twoNextPage = page + 2;
  let markup = '';
  leftArrowRef.classList.add('is-hidden');
  rightArrowRef.classList.add('is-hidden');

  if (!page || page > pages) return;

  if (page > 1) leftArrowRef.classList.remove('is-hidden');

  if (page > 1) markup += `<li class="js-pagination__button-end">1</li>`;

  if (page > 4) markup += `<li class="js-pagination__points">...</li>`;

  if (page > 3)
    markup += `<li class="js-pagination__button">${twoPrevPage}</li>`;

  if (page > 2) markup += `<li class="js-pagination__button">${prevPage}</li>`;

  markup += `<li class="js-pagination__button js-pagination__button-current">${page}</li>`;

  if (page + 1 < pages)
    markup += `<li class="js-pagination__button">${nextPage}</li>`;

  if (page + 2 < pages)
    markup += `<li class="js-pagination__button">${twoNextPage}</li>`;

  if (page + 4 < pages) markup += `<li class="js-pagination__points">...</li>`;

  if (page < pages)
    markup += `<li class="js-pagination__button-end">${pages}</li>`;

  pagContainerRef.innerHTML = markup;

  if (page < pages) rightArrowRef.classList.remove('is-hidden');
}

pagRef.addEventListener('click', ({ target }) => {
  if (target.textContent === '...') return;

  if (target.classList.contains('js-pagination__arrow-left')) currentPage -= 1;
  if (target.classList.contains('js-pagination__svg-left')) currentPage -= 1;
  if (target.classList.contains('js-pagination__use-left')) currentPage -= 1;

  if (target.classList.contains('js-pagination__arrow-right')) currentPage += 1;
  if (target.classList.contains('js-pagination__svg-right')) currentPage += 1;
  if (target.classList.contains('js-pagination__use-right')) currentPage += 1;

  if (target.classList.contains('js-pagination__button'))
    currentPage = Number(target.textContent);
  if (target.classList.contains('js-pagination__button-end'))
    currentPage = Number(target.textContent);

  if (localStorage.getItem(KEY_NOW) === IN_POPULAR) {
    getPopulars(currentPage).then(({ page, results, total_pages: pages }) => {
      renderFilmCards(results);
      renderPagination(page, pages);
    });
  } else {
    movieApi
      .searchMovieFetch(currentPage)
      .then(({ page, results, total_pages: pages }) => {
        renderFilmCards(results);
        renderPagination(page, pages);
      });
  }
});
