!function(){var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},t={},a=n.parcelRequired7c6;null==a&&((a=function(n){if(n in e)return e[n].exports;if(n in t){var a=t[n];delete t[n];var i={id:n,exports:{}};return e[n]=i,a.call(i.exports,i,i.exports),i.exports}var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(n,e){t[n]=e},n.parcelRequired7c6=a),a("aZhHc"),a("d7VxN");var i=a("73ES2"),c=document.querySelector('button[data-action="queue"]');function r(){c.classList.add("filter__button--active"),d.classList.remove("filter__button--active");!function(n){var e=o()[n].map((function(n){var e=n.id,t=n.poster_path,a=n.genre_ids,c=n.title,r=n.release_date,o=(0,i.getGenre)(a),d=r.substring(0,4);o&&d&&(o+=" | "),c||(c="no information");var f=t?l+s+t:NO_IMAGE;return'\n     <li class="film-card">\n          <a href="#" class="film-card__link">\n           <img\n             class="film-card__film-img"\n             src="'.concat(f,'"\n             alt="').concat(c,'"\n             id="').concat(e,'"\n           />\n           <h3 class="film-card__film-name">').concat(c,'</h3>\n           <p class="film-card__genre">').concat(o).concat(d,"</p>\n         </a>\n       </li>\n   ")})).join("");u.innerHTML=e}(0),f.classList.add("is-hidden")}function o(){try{var n=localStorage.getItem("QueueMovies");if(n){n=JSON.parse(n);for(var e=0,t=[];e<n.length;)t.push(n.slice(e,20+e)),e+=20;return t}}catch(n){console.log(n)}}window.addEventListener("load",(function(){return r()})),c.addEventListener("click",r),console.log(o());i=a("73ES2");var l="https://image.tmdb.org/t/p/",s="w500",d=document.querySelector('button[data-action="watched"]'),f=document.querySelector('[data-action="empty"]'),u=document.querySelector('[data-action="list-library"]');function m(){try{var n=localStorage.getItem("WatchedMovies");if(n){n=JSON.parse(n);for(var e=0,t=[];e<n.length;)t.push(n.slice(e,20+e)),e+=20;return t}}catch(n){console.log(n)}}d.addEventListener("click",(function(){c.classList.remove("filter__button--active"),d.classList.add("filter__button--active");return function(n){var e=m()[n].map((function(n){var e=n.id,t=n.poster_path,a=n.genre_ids,c=n.title,r=n.release_date,o=(0,i.getGenre)(a),d=r.substring(0,4);o&&d&&(o+=" | "),c||(c="no information");var f=t?l+s+t:NO_IMAGE;return'\n      <li class="film-card">\n         \t<a href="#" class="film-card__link">\n            <img\n              class="film-card__film-img"\n              src="'.concat(f,'"\n              alt="').concat(c,'"\n              id="').concat(e,'"\n            />\n            <h3 class="film-card__film-name">').concat(c,'</h3>\n            <p class="film-card__genre">').concat(o).concat(d,"</p>\n          </a>\n        </li>\n\t\t")})).join("");u.innerHTML=e}(0),void f.classList.add("is-hidden")})),console.log(m()),a("iDjs5")}();
//# sourceMappingURL=library.dcb6c933.js.map
