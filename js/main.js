import {fetchImages} from './fetch-images.js';
import {displayImages} from './display-images.js';
import {initModal} from './modal.js';
import {SEARCH_FORM_ID, SEARCH_INPUT_ID} from './constants/constants.js';
import {initFooterBurger} from './footer-burger.js';
import {validateSearchInput} from './search-input-validation.js';

const searchForm = document.getElementById(SEARCH_FORM_ID);
const searchInput = document.getElementById(SEARCH_INPUT_ID);

let imagesData = [];
let modalController = null;

modalController = initModal();

async function loadImages(query = '') {
    try {
        imagesData = await fetchImages(query);
        modalController.updateImages(imagesData);
        displayImages(imagesData, (index) => {
            modalController.openModal(index);
        });
    } catch (error) {
        console.error('Error loading images:', error);
    }
}

async function init() {
    await loadImages();
    initFooterBurger();

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();

        if (validateSearchInput(query)) {
            await loadImages(query);
        }
    });
}

init()
    .catch((error) => {
        console.error('Initialization failed:', error);
    });
