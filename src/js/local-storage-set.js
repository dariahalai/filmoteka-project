const btnWatched = document.querySelector(".btn_watched")
const btnQueue = document.querySelector(".btn_queue")
console.log(btnWatched)
console.log(btnQueue)

export default function onModalBtnClick(dataCurentFilm) {
    btnWatched.addEventListener("click", () => {
        console.log("click btnWatched")
        console.log(dataCurentFilm)
        watchedToStorage(dataCurentFilm)
})

btnQueue.addEventListener("click", () => {
    console.log("click btnQueue")
    console.log(dataCurentFilm)
})

}



// export default

let watchedMovies = []

function watchedToStorage(data) {

    watchedMovies = localStorage.getItem("WatchedMovies")

    if (!watchedMovies) {
        watchedMovies = []
        watchedMovies.push(data)
        setWatchedMovie(watchedMovies)
    } else {
        watchedMovies = JSON.parse(watchedMovies)
        console.log("watchedMovies in iffff", watchedMovies)

        // watchedMovies.find(option => {
        // console.log("option.id", option.id)
        // console.log("data.id", data.id)
        //     if (option.id === !data.id) {
        //     console.log("не співпадаєєєєєєєєєє")
        // watchedMovies.push(data)
        // setWatchedMovie(watchedMovies)
        // } else {
        //     alert("This film is already in watched list")
        //     }           
            
        // })
        
        console.log("watchedMovies", watchedMovies)
        console.log("data", data)



        watchedMovies.find(option => {
            // console.log("option", option)
            // console.log("data", data)


            // console.log("option.id", option.id)
            // console.log("data.id", data.id)

            if (option.id === data.id) {

                alert("This film is already in watched list")
            } else {
                console.log("не співпадаєєєєєєєєєє")
                watchedMovies.push(data)
                setWatchedMovie(watchedMovies)

            }
        })
    }
}


function setWatchedMovie(watchedMovies) {
    localStorage.setItem("WatchedMovies", JSON.stringify(watchedMovies))
    console.log("watchedMovies ПІСЛЯЯЯЯЯ", watchedMovies)
    }

    // watchedMovies = watchedMovies ? JSON.parse(watchedMovies) : [];
    
    // watchedMovies.push(data)

    // console.log("data", data.id)

    // watchedMovies.find(option => {
    //     console.log("option", option)
    //     console.log("option.id", option.id)
    //     console.log("data.id", data.id)
    //     if (option.id === data.id) {
    //         alert("This film is already in watched list")
    //         console.log("збіг")
    //     } 
            
    // })

    // const watchedGet = localStorage.getItem("WatchedMovies")
    // const watchedGetArray = JSON.parse(watchedGet)
    // console.log(watchedGetArray)



// function getWatchedArray() {
//     const watchedGet = localStorage.getItem("WatchedMovies")
//     const watchedGetArray = JSON.parse(watchedGet)
//     console.log(watchedGetArray)
// }
// getWatchedArray()










