import axios from 'axios';

const KEY = '9068359f92c010fa6a3cf763f10a0606';
const MEDIA_TYPE = 'movie';
const TIME_WINDOW = 'week';
const API = 'https://api.themoviedb.org/3/trending';
const IMG_PATH = 'https://image.tmdb.org/t/p/';
const FULL_SIZE = 'original';
const SMALL_SIZE = 'w500';

let currentPage = 0;
let totalPages = 0;

const gallaryRef = document.querySelector('.js-gallary');

window.addEventListener('load', evt => {
  gallaryRef.setHTML('');

  getPopulars(1).then(response => {
    const { page, results, total_pages: pages } = response;
    if (!pages) {
      currentPage = page;
      totalPages = pages;
    }
    // renderFilmCards(results);
    // renderPagination(page, pages);
  });
});

async function getPopulars(page) {
  try {
    const searchParams = new URLSearchParams({
      api_key: KEY,
      page: page,
    });

    const response = await axios.get(
      `${API}/${MEDIA_TYPE}/${TIME_WINDOW}?${searchParams}`
    );

    if (response.status !== 200) {
      throw new Error(response.status);
    }

    return response.data;
  } catch (error) {
    console.log('Підставити картинку, сервер терміново недоступний');
  }
}
