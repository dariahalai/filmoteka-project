import axios from 'axios';
import { KEY, API, MEDIA_TYPE } from './constants';

export const getMovieTrailer = async movieId => {
  try {
    const searchParams = new URLSearchParams({
      api_key: KEY,
    });

    const response = await axios.get(
      `${API}${MEDIA_TYPE}/${movieId}/videos?${searchParams}`
    );
    console.log(
      'here',
      `${API}${MEDIA_TYPE}/${movieId}/videos?${searchParams}`
    );
    if (response.status !== 200) {
      throw new Error(response.status);
    }

    return response.data;
  } catch (error) {
    // console.log('Підставити картинку, сервер терміново недоступний');
  }
};

export const trailerButtonRef = document.getElementById('trailer');
const trailerErrorContainer = document.getElementById('trailer-error');
const spinner = document.querySelector('.spinner');

if (!trailerButtonRef) {
  return;
}

export const handleBackButtonClick = (iframeContainer, trailerContainer) => {
  trailerContainer.classList.remove('display-none');
  trailerErrorContainer.innerHTML = '';
  if (iframeContainer) {
    iframeContainer.remove();
  }
};

const renderYoutubeIframe = movieKey => {
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${movieKey}`;
  iframe.frameBorder = '0';
  iframe.allowFullscreen = true;
  const trailerContainer = document.querySelector('.film__info-wrapper');
  trailerContainer.classList.add('display-none');
  const iframeContainer = document.createElement('div');
  iframeContainer.classList.add('iframe-container');
  iframeContainer.setHTML(
    '<button class="back-button" id="back-to-modal">BACK</button>'
  );
  trailerContainer.after(iframeContainer);
  const backButton = document.getElementById('back-to-modal');
  backButton.addEventListener('click', () => {
    handleBackButtonClick(iframeContainer, trailerContainer);
    backButton.removeEventListener('click', handleBackButtonClick);
  });
  iframeContainer.appendChild(iframe);
};

export const handleTrailerButtonClick = () => {
  spinner.classList.remove('is-hidden');
  const movieId = trailerButtonRef.getAttribute('data-movie-id');
  getMovieTrailer(movieId)
    .then(data => {
      const results = data.results;
      if (!results.length) {
        throw new Error('Trailer is not available');
      }
      renderYoutubeIframe(results[0].key);
    })
    .catch(e => {
      trailerErrorContainer.innerText = e.message;
    })
    .finally(() => {
      spinner.classList.add('is-hidden');
    });
};

trailerButtonRef.addEventListener('click', handleTrailerButtonClick);
