!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=e.parcelRequired7c6;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var a=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,a.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequired7c6=a),a("aZhHc"),a("d7VxN");var i=document.querySelector('button[data-action="queue"]');function o(){i.classList.add("filter__button--active"),c.classList.remove("filter__button--active");try{var e=localStorage.getItem("QueueMovies");e&&(s(e=JSON.parse(e)),l.classList.add("is-hidden"))}catch(e){console.log(e)}}window.addEventListener("load",(function(){return o()})),i.addEventListener("click",o);var r=a("73ES2"),c=document.querySelector('button[data-action="watched"]'),l=document.querySelector('[data-action="empty"]'),d=document.querySelector('[data-action="list-library"]');function s(e){var t=e.map((function(e){var t=e.id,n=e.poster_path,a=e.genre_ids,i=e.title,o=e.release_date,c=(0,r.getGenre)(a),l=o.substring(0,4);c&&l&&(c+=" | "),i||(i="no information");var d=n?"https://image.tmdb.org/t/p/w500"+n:NO_IMAGE;return'\n      <li class="film-card">\n         \t<a href="#" class="film-card__link">\n            <img\n              class="film-card__film-img"\n              src="'.concat(d,'"\n              alt="').concat(i,'"\n              id="').concat(t,'"\n            />\n            <h3 class="film-card__film-name">').concat(i,'</h3>\n            <p class="film-card__genre">').concat(c).concat(l,"</p>\n          </a>\n        </li>\n\t\t")})).join("");d.innerHTML=t}c.addEventListener("click",(function(){i.classList.remove("filter__button--active"),c.classList.add("filter__button--active");try{var e=localStorage.getItem("WatchedMovies");e&&(s(e=JSON.parse(e)),l.classList.add("is-hidden"))}catch(e){console.log(e)}return})),a("iDjs5");var u=a("4LMMA"),f=(r=a("73ES2"),{gallery:document.querySelector(".js-gallery"),closeBtn:document.querySelector("[data-modal-close]"),activLibraryBtn:document.querySelector(".filter__item>.filter__button--active")}),v=new(0,r.default);function m(){v.close(),f.closeBtn.removeEventListener("click",m),window.removeEventListener("keydown",g)}function g(e){"Escape"===e.code&&(v.close(),f.closeBtn.removeEventListener("click",m),window.removeEventListener("keydown",g))}f.gallery.addEventListener("click",(function(e){if(e.preventDefault(),"IMG"!==e.target.nodeName)return;var t=(n=e.target.id,("Queue"===f.activLibraryBtn.textContent?u.load("QueueMovies"):u.load("WatchedMovies")).find((function(e){return e.id===Number(n)})));var n;v.modifyDataFilm(t),v.open(),f.closeBtn.addEventListener("click",m),window.addEventListener("keydown",g)})),f.closeBtn.addEventListener("click",m),window.addEventListener("keydown",g),document.addEventListener("click",(function(e){!e.target.closest(".modal")&&e.target.closest(".backdrop")&&m()}))}();
//# sourceMappingURL=library.8614041e.js.map
