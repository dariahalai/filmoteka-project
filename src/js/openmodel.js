import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const refs = {
    cardBtn: document.querySelector('.card'),
    closeBtn: document.querySelector('.close__btn'),
};



refs.cardBtn.addEventListener('click', openModal);

function openModal(e) {
    e.preventDefault();

    needFatch(e.target.dataset.id)
    .then(data => {
        if (e.target.nodeName !== 'IMG') return;

        const markup = need_MARKUP;
        const modal = basicLightbox.create(markup);

        modal.show();

        refs.closeBtn.addEventListener('click', closeModal);
        window.addEventListener('keydown', closeModalHandler);
        
        function closeModalHandler(e) {
            if (e.code === 'Escape') {
            modal.close();
            window.removeEventListener('keydown', closeModalHandler);
        }
    }

        function closeModal(e) {
            modal.close();
            window.removeEventListener('keydown', closeModalHandler);
        }

    })
    };

