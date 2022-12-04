const refs = {
    form: document.querySelector(".header__form"),
    input: document.querySelector("header__input"),
    formButton: document.querySelector(".btn"),
    gallery: document.querySelector(".js-gallery"),
    warning: document.querySelector(".header__warning"),
}

console.log("hiiiii")

import axios from 'axios';
import { renderFilmCards } from "./popular"

const KEY = '9068359f92c010fa6a3cf763f10a0606';
const BASE_URL = "https://api.themoviedb.org/3";

class searchMovieApi {
    constructor() {
        this.searchQuery = "";
        this.page = 1;
    }

    async searchMovieFetch() {
        const searchMovieParams = new URLSearchParams({
            api_key: KEY,
            language: "en-US",
            query: `${this.searchQuery}`,
            page: `${this.page}`,
            include_adult: false,
        });

        try {
            const response = await axios.get(`${BASE_URL}/search/movie?${searchMovieParams}`) 

            if (response.status !== 200) {
                    throw new Error(response.status);
                }
            
            this.page += 1;

            return response.data.results;

        } catch (error) {
            console.log(error.message);
        }
    }

    get query() {
        return this.searchQuery;
    };

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    resetPage() {
        this.page = 1;
    }
};


const movieApi = new searchMovieApi();

function clearSearch() {
    refs.gallery.innerHTML = "";
}

refs.form.addEventListener("submit", onSearchClick)

function onSearchClick(evt) {
    evt.preventDefault();



    movieApi.query = evt.currentTarget.elements.searchQuery.value.trim().toLowerCase();


    if (movieApi.query === "") {
        refs.warning.insertAdjacentHTML("beforeend", `<div class="header__warning-message">Search result not successful. Enter the correct movie name and try again.</div>`);

        setTimeout(() => {
            refs.warning.innerHTML = "";
        }, 3000);
        return;
    }

    // movieApi.resetPage();

    movieApi.searchMovieFetch().then((data) => {
    clearSearch();
        renderFilmCards(data)
        
        console.log(data)
    }
    )
};