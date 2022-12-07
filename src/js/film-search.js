import axios from 'axios';

import { renderPagination } from './pagination.js';
import { renderFilmCards } from './popular.js';


const refs = {
    form: document.querySelector(".header__form"),
    input: document.querySelector(".header__input"),
    formButton: document.querySelector(".btn"),
    gallery: document.querySelector(".js-gallery"),
    warning: document.querySelector(".header__warning"),
    inputBtnClear: document.querySelector(".btn-cross")
}

const KEY = '9068359f92c010fa6a3cf763f10a0606';
const BASE_URL = "https://api.themoviedb.org/3";

export default class SearchMovieApi {
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
            
            // this.page += 1;

            return response.data;

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

export const movieApi = new SearchMovieApi();

refs.inputBtnClear.style.display = "none";

function clearSearch() {
    refs.gallery.innerHTML = "";
}

refs.input.addEventListener("input", onInputClear);

refs.form.addEventListener("submit", onSearchClick);

function onInputClear(evt) {
    const inputValue = refs.input.value;

    if (inputValue) {
        refs.inputBtnClear.style.display = "block";
        
        refs.inputBtnClear.addEventListener("click", () => {
            refs.inputBtnClear.style.display = "none";
            refs.input.value = "";
            return;
        })          
    }
};

function onSearchClick(evt) {
    evt.preventDefault();
    
    movieApi.query = evt.currentTarget.elements.searchQuery.value.trim().toLowerCase();

    movieApi.resetPage();

    movieApi.searchMovieFetch().then((response) => {

        const { page, results, total_pages: pages } = response;

        if (!movieApi.query || !results.length) {
        refs.warning.insertAdjacentHTML("beforeend", `<div class="header__warning-message">Search result not successful. Enter the correct movie name.</div>`);

        setTimeout(() => {
            refs.warning.innerHTML = "";
        }, 4000);          

        return;
    }
        clearSearch();

        renderFilmCards(results);
    }
    )
};