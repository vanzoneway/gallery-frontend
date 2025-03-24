import {GALLERY_SELECTOR} from './gallery-constants.js';

export function displayImages(imagesData, onImageClick) {
    const gallery = document.querySelector(GALLERY_SELECTOR);
    if (!gallery) return;

    gallery.innerHTML = '';

    imagesData.forEach((image, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = image.urls.regular;
        imgElement.alt = image.alt_description;
        imgElement.dataset.index = index;
        imgElement.addEventListener('click', () => onImageClick(index));
        gallery.appendChild(imgElement);
    });
}