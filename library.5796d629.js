!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=e.parcelRequired7c6;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var a=n[e];delete n[e];var c={id:e,exports:{}};return t[e]=c,a.call(c.exports,c,c.exports),c.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequired7c6=a),a("aZhHc"),a("d7VxN");var c=document.querySelector('button[data-action="queue"]');function o(){c.classList.add("filter__button--active"),s.classList.remove("filter__button--active");try{var e=localStorage.getItem("QueueMovies");e&&(u(e=JSON.parse(e)),r.classList.add("is-hidden"))}catch(e){console.log(e)}}window.addEventListener("load",(function(){return o()})),c.addEventListener("click",o);var i=a("73ES2"),s=document.querySelector('button[data-action="watched"]'),r=document.querySelector('[data-action="empty"]'),d=document.querySelector('[data-action="list-library"]');function u(e){var t=e.map((function(e){var t=e.id,n=e.poster_path,a=e.genre_ids,c=e.title,o=e.release_date,s=(0,i.getGenre)(a),r=o.substring(0,4);s&&r&&(s+=" | "),c||(c="no information");var d=n?"https://image.tmdb.org/t/p/w500"+n:NO_IMAGE;return'\n      <li class="film-card">\n         \t<a href="#" class="film-card__link">\n            <img\n              class="film-card__film-img"\n              src="'.concat(d,'"\n              alt="').concat(c,'"\n              id="').concat(t,'"\n            />\n            <h3 class="film-card__film-name">').concat(c,'</h3>\n            <p class="film-card__genre">').concat(s).concat(r,"</p>\n          </a>\n        </li>\n\t\t")})).join("");d.innerHTML=t}s.addEventListener("click",(function(){c.classList.remove("filter__button--active"),s.classList.add("filter__button--active");try{var e=localStorage.getItem("WatchedMovies");e&&(u(e=JSON.parse(e)),r.classList.add("is-hidden"))}catch(e){console.log(e)}return})),a("iDjs5");var l=a("4LMMA"),v=(i=a("73ES2"),a("iDjs5")),m={gallery:document.querySelector(".js-gallery"),closeBtn:document.querySelector("[data-modal-close]"),btnWatched:document.querySelector(".btn_watched"),btnQueue:document.querySelector(".btn_queue"),activLibraryBtn:document.querySelector(".filter__item>.filter__button--active")},f=new(0,i.default);function h(){f.close(),m.closeBtn.removeEventListener("click",h),window.removeEventListener("keydown",_),window.location.reload()}function _(e){"Escape"===e.code&&(f.close(),m.closeBtn.removeEventListener("click",h),window.removeEventListener("keydown",_))}m.gallery.addEventListener("click",(function(e){if(e.preventDefault(),"IMG"!==e.target.nodeName)return;var t=(n=e.target.id,l.load("QueueMovies").concat(l.load("WatchedMovies")).find((function(e){return e.id===Number(n)})));var n;f.modifyDataFilm(t),f.open(),m.btnWatched.addEventListener("click",(function(){m.btnWatched.classList.contains("watched_send")?(m.btnWatched.textContent="REMOVE FROM WATCHED",m.btnWatched.classList.replace("watched_send","watched_remove"),(0,v.sendWatchedToStorage)()):m.btnWatched.classList.contains("watched_remove")&&(m.btnWatched.textContent="ADD TO WATCHED",m.btnWatched.classList.replace("watched_remove","watched_send"),function(e){try{var t=localStorage.getItem("WatchedMovies"),n=JSON.parse(t),a=n.findIndex((function(t){return t.id===e.id}));n.splice(a,1),localStorage.setItem("WatchedMovies",JSON.stringify(n))}catch(e){}}(t));m.btnWatched.textContent="ADD TO WATCHED",m.btnWatched.classList.replace("watched_remove","watched_send")})),m.btnQueue.addEventListener("click",(function(){m.btnQueue.classList.contains("queue_send")?(m.btnQueue.textContent="REMOVE FROM QUEUE",m.btnQueue.classList.replace("queue_send","queue_remove"),(0,v.sendQueueToStorage)()):m.btnQueue.classList.contains("queue_remove")&&(m.btnQueue.textContent="ADD TO QUEUE",m.btnQueue.classList.replace("queue_remove","queue_send"),function(e){try{var t=localStorage.getItem("QueueMovies"),n=JSON.parse(t),a=n.findIndex((function(t){return t.id===e.id}));n.splice(a,1),localStorage.setItem("QueueMovies",JSON.stringify(n))}catch(e){}}(t));m.btnQueue.textContent="ADD TO QUEUE",m.btnQueue.classList.replace("queue_remove","queue_send")})),localStorage.setItem("CurrentFilm",JSON.stringify(t)),function(e){try{var t=localStorage.getItem("WatchedMovies");JSON.parse(t).find((function(t){return t.id===e.id}))?(m.btnWatched.classList.replace("watched_send","watched_remove"),m.btnWatched.textContent="REMOVE FROM WATCHED"):(m.btnWatched.classList.replace("watched_remove","watched_send"),m.btnWatched.textContent="ADD TO WATCHED")}catch(e){m.btnWatched.classList.replace("watched_remove","watched_send")}}(t),m.btnWatched.classList.contains("watched_remove")?m.btnWatched.textContent="REMOVE FROM WATCHED":m.btnWatched.classList.contains("watched_send")&&(m.btnWatched.textContent="ADD TO WATCHED");(function(e){try{var t=localStorage.getItem("QueueMovies");JSON.parse(t).find((function(t){return t.id===e.id}))?(m.btnQueue.classList.replace("queue_send","queue_remove"),m.btnQueue.textContent="REMOVE FROM QUEUE"):(m.btnQueue.classList.replace("queue_remove","queue_send"),m.btnQueue.textContent="ADD TO QUEUE")}catch(e){m.btnQueue.classList.replace("queue_remove","queue_send")}})(t),m.btnQueue.classList.contains("queue_remove")?m.btnQueue.textContent="REMOVE FROM QUEUE":m.btnWatched.classList.contains("queue_send")&&(m.btnQueue.textContent="ADD TO QUEUE");m.closeBtn.addEventListener("click",h),window.addEventListener("keydown",_)})),m.closeBtn.addEventListener("click",h),window.addEventListener("keydown",_),document.addEventListener("click",(function(e){!e.target.closest(".modal")&&e.target.closest(".backdrop")&&h()}))}();
//# sourceMappingURL=library.5796d629.js.map
