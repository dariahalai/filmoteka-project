const btnWatched = document.querySelector(".btn_watched")
const btnQueue = document.querySelector(".btn_queue")

export function onWatchedBtnClick(dataCurentWatchedFilm) {
    btnWatched.addEventListener("click", () => watchedToStorage(dataCurentWatchedFilm))
}
export function onQueueBtnClick(dataCurentQueueFilm) {
    btnQueue.addEventListener("click", () => queueToStorage(dataCurentQueueFilm))
}

//////// send to storage "ADD to WATCHED" movies
let watchedMovies = []
function watchedToStorage(data) {
    watchedMovies = localStorage.getItem("WatchedMovies")

    if (!watchedMovies) {
        watchedMovies = [];
        watchedMovies.push(data)
        console.log("лог в іф локал пустий")
        return setWatchedMovie(watchedMovies)
    }
    watchedMovies = JSON.parse(watchedMovies)
    console.log("лог після першого іф Парс фільму")

    const findMovie = watchedMovies.find(option => option.id === data.id 
    );
    if (findMovie) {
        alert("alertalertalertalert")
        console.log("лог у фінд ЄЄЄЄЄ збіг")
        return 
    } else {
        watchedMovies.push(data)
        console.log("лог else у фінд не співпадає")
        return setWatchedMovie(watchedMovies)
    }
}

function setWatchedMovie(watchedMovies) {
    localStorage.setItem("WatchedMovies", JSON.stringify(watchedMovies))
    console.log("watchedMovies фільм у сторедж записати", watchedMovies)
    }


    //////// send to storage "ADD to QUEUE" movies
let queueMovies = []
function queueToStorage(data) {
    queueMovies = localStorage.getItem("QueueMovies")

    if (!queueMovies) {
        queueMovies = [];
        queueMovies.push(data)
        console.log("queueMovies лог в іф локал пустий")
        return setQueueMovie(queueMovies)
    }
    queueMovies = JSON.parse(queueMovies)
    console.log("queueMovies лог після першого іф Парс фільму")

    const findQueueMovie = queueMovies.find(option => option.id === data.id 
    );
    if (findQueueMovie) {
        console.log("queueMovies лог у фінд ЄЄЄЄЄ збіг")
        return 
    } else {
        queueMovies.push(data)
        console.log("queueMovies лог else у фінд не співпадає")
        return setQueueMovie(queueMovies)
    }
}
function setQueueMovie(queueMovies) {
    localStorage.setItem("QueueMovies", JSON.stringify(queueMovies))
    console.log("queueMovies фільм у сторедж записати", queueMovies)
    }


    ////// Геттер масиву фульмів 'ADD to WATCHED' з локад сторедж (ключ "WatchedMovies")//////////
function getWatchedArray() {
    try {
        const watchedGet = localStorage.getItem("WatchedMovies")
        const watchedGetArray = JSON.parse(watchedGet)
        console.log("watchedGetArray", watchedGetArray)
    } catch (error) {
        console.error('Get state error: ', error.message);
    }
}
getWatchedArray()

    ////// Геттер масиву фульмів 'ADD to QUEUE' з локад сторедж (ключ "QueueMovies")//////////
function getQueueArray() {
    try {
        const queueGet = localStorage.getItem("QueueMovies")
        const queueGetArray = JSON.parse(queueGet)
        console.log("queueGetArray", queueGetArray)
    } catch (error) {
        console.error('Get state error: ', error.message);
    }
}
getQueueArray()










