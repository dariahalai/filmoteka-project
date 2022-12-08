import { emptyRefs, btnWatchedRefs, IMG_PATH, SMALL_SIZE, galleryLibrary } from './watched';

// import { renderWatchedFilmCards } from './watched';
import { getGenre } from './modal-film.js';

export const btnQueuedRefs = document.querySelector(
  'button[data-action="queue"]'
);


const QUEUE_KEY = 'QueueMovies';

window.addEventListener('load', () => onBtnQueueClick());

btnQueuedRefs.addEventListener('click', onBtnQueueClick);

function onBtnQueueClick() {
  
  btnQueuedRefs.classList.add('filter__button--active');
  btnWatchedRefs.classList.remove('filter__button--active');
  let page = 0;
  // try {
  //   let queueFilms = localStorage.getItem(QUEUE_KEY);
  //   // let page = 0;
  //   if (queueFilms) {
  //     queueFilms = JSON.parse(queueFilms);

  //     // queueFilms = chunkQueueFilms()[page];

  //     renderWatchedFilmCards(queueFilms);

  //     emptyRefs.classList.add('is-hidden');
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
  renderQueuedFilmCards(page)
  emptyRefs.classList.add('is-hidden');
  return;
}


export function renderQueuedFilmCards(page) { 
  
 let markup = chunkQueueFilms()[page]
   .map(({ id, poster_path, genre_ids, title, release_date }) => {
     let genresStr = getGenre(genre_ids);
     let year = release_date.substring(0, 4);
     if (genresStr && year) genresStr += ' | ';
     if (!title) title = 'no information';

     let smallImg = !!poster_path
       ? IMG_PATH + SMALL_SIZE + poster_path
       : NO_IMAGE;

     return `
     <li class="film-card">
          <a href="#" class="film-card__link">
           <img
             class="film-card__film-img"
             src="${smallImg}"
             alt="${title}"
             id="${id}"
           />
           <h3 class="film-card__film-name">${title}</h3>
           <p class="film-card__genre">${genresStr}${year}</p>
         </a>
       </li>
   `;
   })
   .join('');

 galleryLibrary.innerHTML = markup;
}

// Функція ділить queue films на масиви, в кожному по 20 фільмів(обєктів)

export function chunkQueueFilms() {
  // дільник, кількість фільмів на сторінці
  const chunk = 20;
  try {
    let data = localStorage.getItem(QUEUE_KEY);
    if (data) {
      data = JSON.parse(data);
      let i = 0;
      const updateData = [];
      while (i < data.length) {
        updateData.push(data.slice(i, chunk + i));
        i += chunk;        
      }
      return updateData;
    }
  } catch (error) {
    console.log(error);
  }
}

console.log(chunkQueueFilms());

