//////// send to storage "ADD to WATCHED" movies
let watchedMovies = []
export function sendWatchedToStorage(data) {
    watchedMovies = localStorage.getItem("WatchedMovies")

    if (!watchedMovies) {
        watchedMovies = [];
        watchedMovies.push(data)
        return setWatchedMovie(watchedMovies)
    }
    watchedMovies = JSON.parse(watchedMovies)
    const findMovie = watchedMovies.find(option => option.id === data.id 
    );
    if (findMovie) {
        return 
    } else {
        watchedMovies.push(data)
        return setWatchedMovie(watchedMovies)
    }    
}

function setWatchedMovie(watchedMovies) {
    localStorage.setItem("WatchedMovies", JSON.stringify(watchedMovies))
    }

    //////// send to storage "ADD to QUEUE" movies
let queueMovies = []
export function sendQueueToStorage(data) {
    queueMovies = localStorage.getItem("QueueMovies")

    if (!queueMovies) {
        queueMovies = [];
        queueMovies.push(data)
        return setQueueMovie(queueMovies)
    }
    queueMovies = JSON.parse(queueMovies)

    const findQueueMovie = queueMovies.find(option => option.id === data.id 
    );
    if (findQueueMovie) {
        return 
    } else {
        queueMovies.push(data)
        return setQueueMovie(queueMovies)
    }
}
function setQueueMovie(queueMovies) {
    localStorage.setItem("QueueMovies", JSON.stringify(queueMovies))
}





