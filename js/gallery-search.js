import { SEARCH_FORM_ID, SEARCH_INPUT_ID, GALLERY_SELECTOR } from './gallery-constants.js';

const searchForm = document.getElementById(SEARCH_FORM_ID);
const searchInput = document.getElementById(SEARCH_INPUT_ID);
const gallery = document.querySelector(GALLERY_SELECTOR);

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === '') {
        const allImages = document.querySelectorAll(`${GALLERY_SELECTOR} img`);
        allImages.forEach((img) => (img.style.display = 'block'));
        const noResultsMessage = document.getElementById('no-results-message');
        if (noResultsMessage) noResultsMessage.remove();
        return;
    }

    if (searchTerm.length < 3 || searchTerm.length > 50) {
        alert('Search term must be between 3 and 50 characters.');
        return;
    }

    const forbiddenChars = /[^A-Za-z0-9!$&*\-=^`|~#%'+/?_{} ]/;
    if (forbiddenChars.test(searchTerm)) {
        alert('Invalid characters in search term.');
        return;
    }

    filterImages(searchTerm);
});

function filterImages(searchTerm) {
    const allImages = document.querySelectorAll(`${GALLERY_SELECTOR} img`);
    let hasResults = false;

    allImages.forEach((img) => {
        const altText = img.alt.toLowerCase();
        if (altText.includes(searchTerm)) {
            img.style.display = 'block';
            hasResults = true;
        } else {
            img.style.display = 'none';
        }
    });

    const noResultsMessage = document.getElementById('no-results-message');
    if (!hasResults) {
        if (!noResultsMessage) {
            const message = document.createElement('p');
            message.id = 'no-results-message';
            message.textContent = 'No images found.';
            gallery.appendChild(message);
        }
    } else {
        if (noResultsMessage) noResultsMessage.remove();
    }
}