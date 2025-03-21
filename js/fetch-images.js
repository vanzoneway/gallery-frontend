import {UNSPLASH_API_URL} from './gallery-constants.js';
import {ACCESS_KEY} from './unsplash-access-key.js'

export async function fetchImages() {
    try {
        const response = await fetch(
            `${UNSPLASH_API_URL}&client_id=${ACCESS_KEY}`
        );
        return await response.json();
    } catch (error) {
        console.error('Error while loading images:', error);
        return [];
    }
}