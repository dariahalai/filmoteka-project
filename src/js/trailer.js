import { getMovieTrailer } from './popular';

const trailerButtonRef = document.getElementById('trailer');
if (!trailerButtonRef) {
  return;
}
let trailerIsLoading = false;

const handleBackButtonClick = (modalContent, trailerContainer) => {
  trailerContainer.setHTML(modalContent);
};

const renderYoutubeIframe = movieKey => {
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${movieKey}`;
  iframe.width = 560;
  iframe.height = 315;
  iframe.frameBorder = '0';
  iframe.allowFullscreen = true;
  const trailerContainer = document.getElementById('trailer-container');
  const modalContent = trailerContainer.innerHTML;
  trailerContainer.innerHTML = '';
  trailerContainer.setHTML('<button id="back-to-modal">BACK</button>');
  const backButton = document.getElementById('back-to-modal');
  backButton.addEventListener('click', () => {
    handleBackButtonClick(modalContent, trailerContainer);
    backButton.removeEventListener('click', handleBackButtonClick);
  });
  trailerContainer.appendChild(iframe);
};

const handleTrailerButtonClick = event => {
  trailerIsLoading = true;
  const movieId = event.target.getAttribute('data-movie-id');
  getMovieTrailer(movieId)
    .then(data => {
      const results = data.results.filter(
        item => item.official && item.name.includes('Official Trailer')
      );
      if (!results.length) {
        throw new Error('Trailer is not available');
      }
      renderYoutubeIframe(results[0].key);
    })
    .catch(e => {
      document.getElementById('trailer-error').innerText = e.message;
    })
    .finally(() => {
      trailerIsLoading = false;
    });
};

trailerButtonRef.addEventListener('click', handleTrailerButtonClick);
