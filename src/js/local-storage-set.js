//////// send to storage "ADD to WATCHED" movies

let watchedMovies = []

export function sendWatchedToStorage() {
    let currentFilm;
  try {
    const storageFilm = localStorage.getItem("CurrentFilm")
    currentFilm = JSON.parse(storageFilm)
    } catch (error) {
    }
    watchedMovies = localStorage.getItem("WatchedMovies")

    if (!watchedMovies) {
        watchedMovies = [];
        watchedMovies.push(currentFilm)
        return setWatchedMovie(watchedMovies)
    }
    watchedMovies = JSON.parse(watchedMovies)
    const findMovie = watchedMovies.find(option => option.id === currentFilm.id 
    );
    if (findMovie) {
        return 
    } else {
        watchedMovies.push(currentFilm)
        return setWatchedMovie(watchedMovies)
    }    
}

function setWatchedMovie(watchedMovies) {
    localStorage.setItem("WatchedMovies", JSON.stringify(watchedMovies))
}

//////// send to storage "ADD to QUEUE" movies
let queueMovies = [];

export function sendQueueToStorage() {
    let currentFilm;
    try {
    const storageFilm = localStorage.getItem("CurrentFilm")
      currentFilm = JSON.parse(storageFilm)
    } catch (error) {
    }

    queueMovies = localStorage.getItem("QueueMovies")

    if (!queueMovies) {
        queueMovies = [];
        queueMovies.push(currentFilm)
        return setQueueMovie(queueMovies)
    }
    queueMovies = JSON.parse(queueMovies)

    const findQueueMovie = queueMovies.find(option => option.id === currentFilm.id 
    );
    if (findQueueMovie) {
        return 
    } else {
        queueMovies.push(currentFilm)
        return setQueueMovie(queueMovies)
    }
}
function setQueueMovie(queueMovies) {
    localStorage.setItem("QueueMovies", JSON.stringify(queueMovies))
}
