import {fetchImages} from './fetch-images.js';
import {displayImages} from './display-images.js';
import {openModal} from './gallery-modal-window.js';
import {GALLERY_SELECTOR} from './gallery-constants.js';
import './gallery-search.js';

const gallery = document.querySelector(GALLERY_SELECTOR);

export let imagesData = [];

async function init() {
    imagesData = await fetchImages();
    displayImages(imagesData);

    gallery.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            const dataIndex = parseInt(e.target.getAttribute('data-index'));
            openModal(dataIndex);
        }
    });
}

init()
    .then(() => {
        console.log('Initialization completed successfully.');
    })
    .catch((error) => {
        console.error('Initialization failed:', error);
    });