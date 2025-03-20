import {GALLERY_SELECTOR} from './gallery-constants.js';

export function displayImages(imagesData) {
    const gallery = document.querySelector(GALLERY_SELECTOR);
    gallery.innerHTML = imagesData
        .map(
            (image, index) => `
        <img src="${image.urls.regular}" alt="${image.alt_description}" data-index="${index}">
    `
        )
        .join('');
}