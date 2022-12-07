import spinnerToggle from './spinner';

const listElement = document.querySelector('.js-pagination');
const paginationElement = document.getElementById('pagination');
const arrowLeft = document.querySelector('.arrow_left');
const arrowRight = document.querySelector('.arrow_right');

let currentPage = 1;
let pageCount;
const pagesOnWindow = 5;
let rows = 20;

// Рвзметка для пагинации
{/* <div class="pagination__container">
<div class="pagination__container_pages">
        <div class="pag-arrow arrow_left"></div>
        <div class="pagenumbers" id="pagination"></div>
        <div class="pag-arrow arrow_right"></div>
</div>
</div> */}

function resetCurrentPage() {
    currentPage = 1;
}

// главная функция для рендера pagination. Callback - функция для работы с fetch (зависит от раздела, где рисуем pagination)
export function renderPagination(totalPages, listItems, callback, searchQuery) {
    paginationElement.innerHTML = '';
    resetCurrentPage();
    arrowLeft.removeEventListener('click', onArrowLeftClick);
    arrowRight.removeEventListener('click', onArrowRightClick);

function setupPagination(items, wrapper, rowsPerPage) {
    wrapper.innerHTML = '';

    pageCount = totalPages;
    let maxLeftPage = currentPage - Math.floor(pagesOnWindow / 2);
    let maxRightPage = currentPage + Math.floor(pagesOnWindow / 2);

    if (maxLeftPage < 1) {
        maxLeftPage = 1;
        maxRightPage = pagesOnWindow;
    }

    if (maxRightPage > totalPages) {
        maxLeftPage = totalPages - (pagesOnWindow - 1);

        if (maxLeftPage < 1) {
            maxLeftPage = 1;
        }
        maxRightPage = totalPages;
    }

    for (let i = 1; i <= totalPages; i++) {
        if (maxLeftPage !== 1 && i == 1) {
        let btn = paginationButton(i, items);
        wrapper.appendChild(btn);
        }

        if (maxRightPage !== totalPages && i == totalPages) {
        let btn = paginationButton(i, items);
        wrapper.appendChild(btn);
        }

        if (i >= maxLeftPage && i <= maxRightPage) {
        let btn = paginationButton(i, items);
        wrapper.appendChild(btn);
        }

      // добавляет троеточие в pagination в зависимости от текущей страницы и общего к-ва страниц
        if (
            totalPages >= 6 &&
            i == 1 &&
            currentPage !== 1 &&
            currentPage !== 2 &&
            currentPage !== 3
            ) {
                const threeDotsEl = addThreeDotsBlock();
                wrapper.insertBefore(threeDotsEl, wrapper[wrapper.length - 2]);
            }

        if (
            pageCount >= 7 &&
            i == pageCount - 1 &&
            currentPage !== pageCount &&
            currentPage !== pageCount - 2 &&
            currentPage !== pageCount - 1
            ) {
                const threeDotsEl = addThreeDotsBlock();
                wrapper.insertBefore(threeDotsEl, wrapper[1]);
            }
        }
    }

  // создает троеточия для pagination

function addThreeDotsBlock() {
    const threeDots = document.createElement('div');
    threeDots.classList.add('threeDots');
    threeDots.innerText = '...';
    return threeDots;
}

function paginationButton(page, items) {
    let button = document.createElement('button');
    button.innerText = page;

    if (currentPage == page) button.classList.add('active');

    button.addEventListener('click', function () {
        
        spinnerToggle();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        currentPage = page;
        callback(listElement, currentPage, searchQuery);

            let current_btn = document.querySelector('.pagenumbers button.active');
        button.classList.add('active');
        current_btn.classList.remove('active');
        hideExtremeButtons(totalPages);
        setupPagination(listItems, paginationElement, rows);
    });
    return button;
};

  // ф-кция для отслеживания кликов по стрелке влево
function onArrowLeftClick() {
    if (currentPage > 1) {
        spinnerToggle();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        currentPage--;
        setupPagination(listItems, paginationElement, rows);
        callback(listElement, currentPage, searchQuery);
    }

disableArrowBtn(totalPages);
hideExtremeButtons(totalPages);
};

  // ф-кция для отслеживания кликов по стрелке вправо
function onArrowRightClick() {
    if (currentPage < totalPages) {
        spinnerToggle();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        currentPage++;
        setupPagination(listItems, paginationElement, rows);
        callback(listElement, currentPage, searchQuery);
    }
    disableArrowBtn(totalPages);
    hideExtremeButtons(totalPages);
}

setupPagination(listItems, paginationElement, rows);
arrowLeft.onclick = onArrowLeftClick;
arrowRight.onclick = onArrowRightClick;

hideExtremeButtons(totalPages);
disableArrowBtn(totalPages);
};

// прячет первую и последнюю страницу по бокам для мобильных гаджетов с маленьким экраном
function hideExtremeButtons(totalPages) {
    try {
        if (
            /Android|webOS|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent,
                )
                ) {
      // код для мобильных устройств
        const allPaginationBtns = document.querySelectorAll('#pagination button');
        if (currentPage > 3) {
            allPaginationBtns[0].classList.add('hide');
        } else {
            allPaginationBtns[0].classList.remove('hide');
        }

        if (currentPage < totalPages - 3) {
            allPaginationBtns[allPaginationBtns.length - 1].classList.add('hide');
        } else {
            allPaginationBtns[allPaginationBtns.length - 1].classList.remove('hide',);
        }
    }
} catch (error) {}
};

paginationElement.addEventListener('click', disableArrowBtnAfterPageClick);

function disableArrowBtnAfterPageClick(e) {
    if (e.target.tagName != 'BUTTON') {
        return;
    } else {
        disableArrowBtn(pageCount);
}
};

// делает неактивными кнопки-стрелки на первой и последней  странице
function disableArrowBtn(totalPages) {
    if (currentPage === 1) {
        arrowLeft.classList.add('disabled-arrow');
    } else {
        arrowLeft.classList.remove('disabled-arrow');
    }

    if (currentPage === totalPages) {
        arrowRight.classList.add('disabled-arrow');
    } else {
        arrowRight.classList.remove('disabled-arrow');
    }
};