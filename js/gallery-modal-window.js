import {
    MODAL_SELECTOR,
    MODAL_IMAGE_ID,
    CLOSE_BTN_SELECTOR,
    LEFT_ARROW_SELECTOR,
    RIGHT_ARROW_SELECTOR,
    GALLERY_SELECTOR
} from './gallery-constants.js';

let imagesData = [];
let currentImageIndex = 0;

const modal = document.querySelector(MODAL_SELECTOR);
const modalImage = document.getElementById(MODAL_IMAGE_ID);
const closeBtn = document.querySelector(CLOSE_BTN_SELECTOR);
const leftArrow = document.querySelector(LEFT_ARROW_SELECTOR);
const rightArrow = document.querySelector(RIGHT_ARROW_SELECTOR);

function updateImagesData() {
    const gallery = document.querySelector(GALLERY_SELECTOR);
    if (!gallery) return;

    const images = gallery.querySelectorAll('img');

    imagesData = Array.from(images)
        .filter(img => img.style.display !== 'none')
        .map(img => ({
            urls: {
                regular: img.src,
            },
        }));
}

export function openModal(dataIndex) {
    updateImagesData();

    const targetImage = document.querySelector(`img[data-index="${dataIndex}"]`);
    if (!targetImage) {
        console.error('Image with the specified data-index not found');
        return;
    }

    if (targetImage.style.display === 'none') {
        console.error('Image is hidden');
        return;
    }

    const index = imagesData.findIndex(
        (imgData) => imgData.urls.regular === targetImage.src
    );

    if (index >= 0 && index < imagesData.length) {
        currentImageIndex = index;
        modalImage.src = imagesData[currentImageIndex].urls.regular;
        modal.style.display = 'flex';
        document.addEventListener('keydown', handleKeyDown);
    } else {
        console.error('Invalid image index');
    }
}

export function closeModal() {
    modal.style.display = 'none';
    document.removeEventListener('keydown', handleKeyDown);
}

function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + imagesData.length) % imagesData.length;
    modalImage.src = imagesData[currentImageIndex].urls.regular;
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % imagesData.length;
    modalImage.src = imagesData[currentImageIndex].urls.regular;
}

function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') {
        showPreviousImage();
    } else if (event.key === 'ArrowRight') {
        showNextImage();
    } else if (event.key === 'Escape') {
        closeModal();
    }
}

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

leftArrow.addEventListener('click', showPreviousImage);
rightArrow.addEventListener('click', showNextImage);