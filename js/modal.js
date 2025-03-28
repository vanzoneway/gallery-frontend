import {
    MODAL_SELECTOR,
    MODAL_IMAGE_ID,
    CLOSE_BTN_SELECTOR,
    LEFT_ARROW_SELECTOR,
    RIGHT_ARROW_SELECTOR
} from './constants/constants.js';

export function initModal() {
    const modal = document.querySelector(MODAL_SELECTOR);
    const modalImage = document.getElementById(MODAL_IMAGE_ID);
    const closeBtn = document.querySelector(CLOSE_BTN_SELECTOR);
    const leftArrow = document.querySelector(LEFT_ARROW_SELECTOR);
    const rightArrow = document.querySelector(RIGHT_ARROW_SELECTOR);

    let currentImageIndex = 0;
    let imagesData = [];

    function updateModalImage() {
        if (!imagesData.length || !modalImage) return;

        const image = imagesData[currentImageIndex];
        if (image && image.urls) {
            modalImage.src = image.urls.regular;
            modalImage.alt = image.alt_description || '';
        }
    }

    function openModal(index) {
        if (index >= 0 && index < imagesData.length) {
            currentImageIndex = index;
            updateModalImage();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function navigateImage(direction) {
        if (!imagesData.length) return;

        currentImageIndex = (currentImageIndex + direction + imagesData.length) % imagesData.length;
        updateModalImage();
    }

    closeBtn.addEventListener('click', closeModal);
    leftArrow.addEventListener('click', () => navigateImage(-1));
    rightArrow.addEventListener('click', () => navigateImage(1));

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            switch (e.key) {
                case 'ArrowLeft':
                    navigateImage(-1);
                    break;
                case 'ArrowRight':
                    navigateImage(1);
                    break;
                case 'Escape':
                    closeModal();
                    break;
            }
        }
    });

    return {
        openModal,
        updateImages: (newImages) => {
            imagesData = newImages || [];
            currentImageIndex = 0;
        }
    };
}
